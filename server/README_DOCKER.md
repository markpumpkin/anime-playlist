## Docker-Setup

### I. Edit docker-compose.yml file

1. Project name: `COMPOSE_PROJECT_NAME`
2. Database name: `MYSQL_DATABASE`
3. Database port: `MYSQL_LOCAL_PORT`
4. Phpmyadmin port (optional): `PHPMYADMIN_PORT`

### II. Run

1. Stop docker: `sudo docker-compose stop`
2. Remove docker: `sudo docker-compose down`
3. Update docker: `sudo docker-compose up -d`
4. Restart docker: `sudo docker-compose restart`

## Docker document

1. List all container: `sudo docker container ls`
2. Stop container (mysql, phpmyadmin): `sudo docker container stop container_name`
3. Remove container (mysql, phpmyadmin): `sudo docker container rm container_name`
4. List volumn: `sudo docker volume ls`
5. Remove volumn: `sudo docker volume rm volumn_name`
