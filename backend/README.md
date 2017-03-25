### Sillies backend

This is the backend code for the Sillies service.

# Initial setup

Start by setting up a virtual Python environment. Install the virtalenv package with pip

    sudo pip install virtualenv

Go into the backend folder and create a virtual environment

    virtualenv silliesenv

Activate the virtual environment by typing

    source silliesenv/bin/activate

The virtual environment can be exited the this command

    deactivate


# installing requirements

The requirements are listed in the requirements.txt file. Install them (while inside the virtual environment) with this command

    pip install -r requirements.txt
