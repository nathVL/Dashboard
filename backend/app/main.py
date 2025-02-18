from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from sqlmodel import Session, select, delete
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import psutil, time

from database.database import create_db_and_tables, get_session
from models.Metrics import Metrics


app=FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SessionDep = Annotated[Session, Depends(get_session)]

scheduler = BackgroundScheduler()

@app.on_event("startup")
def on_startup():
    """Initialize the db and the scheduler"""
    create_db_and_tables()
    scheduler.add_job(add_metric_job, 'interval', minutes=5)
    scheduler.start()
    print("\033[92mINFO\033[0m:\tScheduler démarré.")    

@app.on_event("shutdown")
def on_shutdown():
    """Stop the scheduler"""
    scheduler.shutdown()
    print("\033[92mINFO\033[0m:\tScheduler arrêté.")

@app.get("/api/live")
def get_live_info():
    """Endpoint to get live metrics."""
    return get_system_info()

@app.get("/api/history")
def get_history_metrics(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
)-> list[Metrics]:
    """Endpoint to get last 24 hours metrics."""
    metrics = session.exec(select(Metrics).offset(offset).limit(limit)).all()
    return metrics


def add_metric_job():
    """Get a newx metric and delete the old ones"""
    session_generator = get_session()
    session: Session = next(session_generator)
    try:
        # Supprimer les métriques de plus de 24 heures
        threshold_time = datetime.utcnow() - timedelta(days=1)
        delete_query = delete(Metrics).where(Metrics.timestamp < threshold_time)
        session.exec(delete_query)

        # Récupérer la nouvelle métriques
        info = get_system_info()
        m = Metrics(
            cpu_usage=info["CPU"]["usage"],
            cpu_frequency=info["CPU"]["frequency"],
            cpu_temperature=info["CPU"]["temperature"],
            ram_usage=info["RAM"]["usage"],
            ram_used=info["RAM"]["used"],
            ram_total=info["RAM"]["total"],
            disk_usage=info["DISK"]["usage"],
            disk_total=info["DISK"]["total"],
            disk_used=info["DISK"]["used"],
            disk_free=info["DISK"]["free"],
            uptime=info["SYSTEM"]["uptime"],
        )
        session.add(m)
        session.commit()
        session.refresh(m)
        print("\033[93mINFO\033[0m:\tEnregistrements de plus de 24h supprimés")
        print("\033[92mINFO\033[0m:\tNouvelle métrique ajoutée")

    except Exception as e:
        print("\033[91mERROR\033[0m:\tErreur lors de l'ajout de la métrique : ", e)
    finally:
        session.close()


def get_cpu_temperature():
    """
    Retrieves CPU temperature in degrees Celsius.
    Returns None if retrieval fails or if the OS does not allow it.
    """
    try:
        if hasattr(psutil, "sensors_temperatures"):
            temps = psutil.sensors_temperatures()
            if "cpu_thermal" in temps:
                return round(temps["cpu_thermal"][0].current, 1)
        return None

    except Exception as e:
        print(f"Erreur lors de la récupération de la température du CPU : {e}")
        return None


def get_system_info():
    """Retrieves live system information."""
    disk = psutil.disk_usage('/')

    sensors = {
        'CPU':{
            'usage': psutil.cpu_percent(interval=1),
            'frequency': psutil.cpu_freq().current,
            'temperature': get_cpu_temperature(),
        },
        'RAM': {
            'usage': psutil.virtual_memory().percent,
            'used': psutil.virtual_memory().used,
            'total': psutil.virtual_memory().total,
        },
        'DISK': {
            'usage': disk.percent,
            'total': disk.total,
            'used': disk.used,
            'free': disk.free,
        },
        'SYSTEM': {
            'uptime': time.time() - psutil.boot_time(),
        },
    }
    return sensors
