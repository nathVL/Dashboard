# Raspberry-dashboard

## Setup

- Clone the project
```shell
git clone
```

- Go in the project
```shell
cd dashboard
```


### Backend

Create a virtual environment
```shell
python3 -m venv backend/venv
```

Activate the virtual environment
- Mac/Linux: ```source ./backend/venv/bin/activate```
- Windows: ```source ./backend/venv/Scripts/activate```

Install the dependencies
```shell
pip install -r ./backend/requirements.txt
```

### Frontend

In the frontend folder

Install
```shell
npm install
```


## Start the application

Start the backend server (in backend/app)
```shell
uvicorn main:app --reload --port 8000
```

Start the frontend server (in frontend/)
```shell
npm run dev
```

## Todo
- [ ] Add login
- [ ] Select language
- [ ] Add SWAP stats
- [ ] Optimizing the /api/live resource



