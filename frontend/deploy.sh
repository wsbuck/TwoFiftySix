#!/bin/bash

printf "Deploying TwoFiftySix\n"
scp -r build/* twofiftysix:/var/www/twofiftysix.williambuck.dev/html/
ssh -t twofiftysix "sudo systemctl restart nginx"
printf "\n"
printf "\nFinished deploying"
