DROP DATABASE IF EXISTS `quizzie`;

CREATE DATABASE `quizzie`;

USE `quizzie`;

CREATE TABLE `topic` (
	`topic_id` int NOT NULL AUTO_INCREMENT,
	`topic_name` TEXT(50) NOT NULL,
	`topic_orig_datets` DATETIME NOT NULL,
	`topic_upd_datets` DATETIME,
	`active_ind` bool,
	PRIMARY KEY (`topic_id`)
);

CREATE TABLE `question` (
	`question_id` int NOT NULL AUTO_INCREMENT,
	`question_text` TEXT(500) NOT NULL,
	`topic_id` int NOT NULL,
	`answer` JSON NOT NULL,
	`active_ind` bool,
	`question_orig_datets` DATETIME NOT NULL,
	`question_upd_datets` DATETIME,
	PRIMARY KEY (`question_id`)
);

CREATE TABLE `user` (
	`user_id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(50) NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(50) NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`teacher_id` int,
	`user_orig_datets` DATETIME NOT NULL,
	`user_upd_datets` DATETIME,
	`role_id` int NOT NULL,
	`active_ind` bool,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `test` (
	`test_id` int NOT NULL AUTO_INCREMENT,
	`topic_id` int NOT NULL,
	`question_id` int NOT NULL,
	`user_id` int NOT NULL,
	`test_orig_datets` DATETIME NOT NULL,
	`test_upd_datets` DATETIME,
	PRIMARY KEY (`test_id`)
);

CREATE TABLE `test_results` (
	`results_id` int NOT NULL AUTO_INCREMENT,
	`test_id` int NOT NULL,
	`user_id` int NOT NULL,
	`questions_answered` int NOT NULL,
	`questions_correct` int NOT NULL,
	`questions_incorrect` int NOT NULL,
	`test_results_orig_datets` DATETIME NOT NULL,
	`test_results_upd_datets` DATETIME,
	PRIMARY KEY (`results_id`)
);

CREATE TABLE `role` (
	`role_id` int NOT NULL AUTO_INCREMENT,
	`role_desc` TEXT NOT NULL,
	PRIMARY KEY (`role_id`)
);

ALTER TABLE `question` ADD CONSTRAINT `question_fk0` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`topic_id`);

ALTER TABLE `user` ADD CONSTRAINT `user_fk1` FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`);

ALTER TABLE `test` ADD CONSTRAINT `test_fk0` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`topic_id`);

ALTER TABLE `test` ADD CONSTRAINT `test_fk1` FOREIGN KEY (`question_id`) REFERENCES `question`(`question_id`);

ALTER TABLE `test` ADD CONSTRAINT `test_fk2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`);

ALTER TABLE `test_results` ADD CONSTRAINT `test_results_fk0` FOREIGN KEY (`test_id`) REFERENCES `test`(`test_id`);

ALTER TABLE `test_results` ADD CONSTRAINT `test_results_fk1` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`);