from sqlmodel import create_engine, SQLModel, Session

# Define the SQLite database file and its URL
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# Create the database engine
engine = create_engine(sqlite_url)

def create_db_and_tables():
    """Create the database tables based on the SQLModel metadata."""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Provide a database session using a context manager."""
    with Session(engine) as session:
        yield session