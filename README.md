## Deploy

    yarn run build

## Commit to github

    git add .
    git commit -m "Deploy to github" && git push

## Visit App

    - go to VPS server: ssh root@138.68.86.81
    - cd /home/Workspace/anime-playlist
    - git pull
    - pm2 startup <restart>

## run with serve:

    - pm2 serve <build_folder_path> <port_for_app>  --name "short_name_app" --spa
    - pm2 save
    - pm2 startup
