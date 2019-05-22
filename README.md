# Buslightyear

Buslightyear is distributed system utility that provides live information to help users and supervisores to know the buses traffic.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Software prerequisites

#### Git

In order for clone the repository it is necessary to have installed [git](https://git-scm.com/) on your machine.

Installing on Linux (Ubuntu):
```
$ sudo apt-get install git
```
#### Docker

In order for iniatilize the code it is necessary to have installed [docker](https://www.docker.com/) on your machine.

Installing on Linux (Ubuntu):
```
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo apt-key fingerprint 0EBFCD88
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Software execution

#### Clonning Buslightyear repo

Once you have all the prerequisites installed, let's go to the first step of all Github repository: Clone and extract the repository.

```
$ git clone https://github.com/sugarbrain/buslightyear/
```

#### Run docker-compose

In this step, we will run all containers declared into docker-compose to initialize the project.

```
$ cd buslightyear
$ sudo docker-compose up
```

### Results

Finally, see your results just typing in your navigator the address https://localhost:8000/public/user.html or https://localhost:8000/public/supervisor.html

## Authors

* **Antonio Neto** - *Initial work* - [aacgn](https://github.com/aacgn)
* **Eduardo Santos** - *Initial work* - [eduardosm7](https://github.com/eduardosm7)
* **Vinícius Giles** - *Initial work* - [gilesv](https://github.com/gilesv)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
