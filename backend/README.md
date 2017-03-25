# Sillies backend

This is the backend code for the Sillies service.

## Initial setup

Start by setting up a virtual Python environment. Install the virtalenv package with pip

    sudo pip install virtualenv

Go into the backend folder and create a virtual environment

    virtualenv silliesenv

Activate the virtual environment by typing

    source silliesenv/bin/activate

The virtual environment can be exited the this command

    deactivate


## Installing requirements

The requirements are listed in the requirements.txt file. Install them (while inside the virtual environment) with this command

    pip install -r requirements.txt

Dependencies include [Flask](http://flask.pocoo.org/) and [imageio](http://imageio.readthedocs.io/en/latest/index.html)

## Setup

The server can be set up in the console with the following:

    python server

The server is set up in test mode, so any changes to the backend code will result in the server being restarted.
