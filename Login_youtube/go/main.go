package main

import (
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

func main() {
	// Capture connection properties.
	cfg := mysql.Config{
		User:                 "user",
		Passwd:               "passw0rd",
		Net:                  "tcp",
		Addr:                 "127.0.0.1:3306",
		DBName:               "sql_login",
		ParseTime:            true,
		AllowNativePasswords: true,
	}
	// Get a database handle.
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		panic(err.Error())
	}

	pingErr := db.Ping()
	if pingErr != nil {
		panic(err.Error())
	}
	fmt.Println("Connected!")
}
