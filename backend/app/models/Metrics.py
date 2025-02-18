from sqlmodel import Field, SQLModel
from datetime import datetime as datetime

class Metrics(SQLModel, table=True):
    """Represents system metrics stored in a database."""
    id: int | None = Field(default=None, primary_key=True)
    timestamp: datetime = Field(default_factory=datetime.now)
    # CPU
    cpu_usage: float | None = Field(default=None)
    cpu_frequency: float | None = Field(default=None)
    cpu_temperature: float | None = Field(default=None)
    # RAM
    ram_usage: float | None = Field(default=None)
    ram_used: int | None = Field(default=None)
    ram_total: int | None = Field(default=None)
    # DISK
    disk_usage: float | None = Field(default=None)
    disk_total: int | None = Field(default=None)
    disk_used: int | None = Field(default=None)
    disk_free: int | None = Field(default=None)
    # SYSTEM
    uptime: float | None = Field(default=None)
