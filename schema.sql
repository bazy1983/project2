DROP TABLE IF EXISTS `quizzie`;

CREATE DATABASE `quizzzie`;

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
	`q_orig_datets` DATETIME NOT NULL,
	`q_upd_datets` DATETIME,
	`answer1` TEXT NOT NULL,
	`answer2` TEXT NOT NULL,
	`answer3` TEXT,
	`answer4` TEXT,
	`correct_answer` TEXT NOT NULL,
	`active_ind` bool,
	PRIMARY KEY (`question_id`)
);

CREATE TABLE `student` (
	`student_id` int NOT NULL AUTO_INCREMENT,
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
	PRIMARY KEY (`student_id`)
);

CREATE TABLE `teacher` (
	`teacher_id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(50) NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(50) NOT NULL,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`teacher_orig_datets` DATETIME NOT NULL,
	`teacher_upd_datets` DATETIME,
	`role_id` int NOT NULL,
	`active_ind` bool,
	PRIMARY KEY (`teacher_id`)
);

CREATE TABLE `test` (
	`test_id` int NOT NULL AUTO_INCREMENT,
	`topic_id` int NOT NULL,
	`question_id` int NOT NULL,
	`teacher_id` int NOT NULL,
	`test_orig_datets` DATETIME NOT NULL,
	`test_upd_datets` DATETIME,
	PRIMARY KEY (`test_id`)
);

CREATE TABLE `test_results` (
	`results_id` int NOT NULL AUTO_INCREMENT,
	`test_id` int NOT NULL,
	`student_id` int NOT NULL,
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

ALTER TABLE `student` ADD CONSTRAINT `student_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`teacher_id`);

ALTER TABLE `student` ADD CONSTRAINT `student_fk1` FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`);

ALTER TABLE `teacher` ADD CONSTRAINT `teacher_fk0` FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`);

ALTER TABLE `test` ADD CONSTRAINT `test_fk0` FOREIGN KEY (`topic_id`) REFERENCES `topic`(`topic_id`);

ALTER TABLE `test` ADD CONSTRAINT `test_fk1` FOREIGN KEY (`question_id`) REFERENCES `question`(`question_id`);

ALTER TABLE `test` ADD CONSTRAINT `test_fk2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher`(`teacher_id`);

ALTER TABLE `test_results` ADD CONSTRAINT `test_results_fk0` FOREIGN KEY (`test_id`) REFERENCES `test`(`test_id`);

ALTER TABLE `test_results` ADD CONSTRAINT `test_results_fk1` FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`);

