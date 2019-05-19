FROM mongo

COPY data/200118_240118.csv data.csv
CMD mongoimport --host mongodb --db DBNAME --collection COLLECTION --type csv --headerline --file data.csv
