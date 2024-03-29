CREATE DATABASE IF NOT EXISTS qbo;
USE qbo;
-- test1
CREATE TABLE IF NOT EXISTS `qbo`.`test` (
   `user_id` INT NOT NULL COMMENT 'ユーザID',
   `user_name` VARCHAR(45) NOT NULL COMMENT 'ユーザ名',
   PRIMARY KEY (`user_id`)
);
-- test2
CREATE TABLE IF NOT EXISTS `qbo`.`users` (
   `id` INT AUTO_INCREMENT NOT NULL COMMENT 'ユーザID',
   `email` VARCHAR(50) NOT NULL COMMENT 'ユーザーメールアドレス',
   `password` TEXT NOT NULL COMMENT 'ユーザーパスワード',
   PRIMARY KEY (`id`)
);

