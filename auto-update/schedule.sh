SCRIPT_DIR=$(dirname "$(realpath "$0")")

crontab -l > current_cron
echo "0 10 * * * $(which bun) $SCRIPT_DIR/index.ts >> $SCRIPT_DIR/logs.out" >> current_cron
crontab current_cron
rm current_cron