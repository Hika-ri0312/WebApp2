#!/bin/bash
/usr/local/bin/python3 -c "import modules.pdf2csv as p2c; p2c.pdf2csv(1)" >> /var/log/cron.log
