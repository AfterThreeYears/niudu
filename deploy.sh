#!/bin/bash
ls | egrep -v node_modules|$($1)

# buildName="$(echo $(date) | sed s/[[:space:]]//g).tar.gz"
#
# tar --exclude=node_modules --exclude=.git --exclude=$buildName -czvf $buildName .
#
# scp ./$buildName root@118.193.167.237:/data/niudu_version
#
# rm -rf ./$buildName
#
# ssh -t root@118.193.167.237 "/data/deploy/niudu.sh $buildName"

#!/bin/bash
# 跑服务器的脚本 并且传入包名
# echo $(ls)
# cd /data/niudu_version
# echo $(ls)
# echo '开始cp'
# echo 当前的包名是 $1
# cp -f $1 /data/niudu
# cd /data/niudu
# rm -rf `ls | egrep -v node_modules`
# echo $(ls)
# echo '开始解压缩'
# tar -xzvf $1
# rm -rf $1
# echo '解压缩成功并且删除包'
# echo '开始安装依赖'
# npm i
# npm run build
# echo 开始安装依赖
# npm run pm2:reload
# echo 'pm2 重启完成'
# pm2 list
