/*
SQLyog Community v13.1.5  (32 bit)
MySQL - 5.7.29-0ubuntu0.18.04.1 : Database - Boogalu
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`Boogalu` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `Boogalu`;

/*Table structure for table `interest_list` */

DROP TABLE IF EXISTS `interest_list`;

CREATE TABLE `interest_list` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_delete` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `interest_list` */

insert  into `interest_list`(`id`,`name`,`is_delete`) values 
(1,'Hip Hop',0),
(2,'Kathak',0),
(3,'Contemporary',0),
(4,'Salsa',0),
(5,'Others',0);

/*Table structure for table `profession_list` */

DROP TABLE IF EXISTS `profession_list`;

CREATE TABLE `profession_list` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_delete` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `profession_list` */

insert  into `profession_list`(`id`,`name`,`is_delete`) values 
(1,'Dance Studio',0),
(2,'Proffesional',0),
(3,'Enthusiast',0),
(4,'Choreographer',0),
(5,'Others',0);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `roles` */

insert  into `roles`(`id`,`role`) values 
(1,'Admin'),
(2,'User');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `UID` varchar(255) NOT NULL,
  `U_name` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `is_delete` tinyint(4) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `role_id` int(11) DEFAULT '2',
  `encrypted_password` varchar(255) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `TC_accepted` tinyint(4) DEFAULT '0',
  `DOB` timestamp NULL DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `country_code` varchar(10) DEFAULT NULL,
  `interests` varchar(255) DEFAULT NULL,
  `professions` varchar(255) DEFAULT NULL,
  `OTP` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`,`UID`,`U_name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`UID`,`U_name`,`website`,`user_name`,`bio`,`email`,`phone_number`,`is_delete`,`created_at`,`updated_at`,`role_id`,`encrypted_password`,`profile_img`,`TC_accepted`,`DOB`,`state`,`country`,`gender`,`country_code`,`interests`,`professions`,`OTP`) values 
(4,'cb62dbae-6bcc-4d58-8161-944909b1f2e0','durai','https://stackoverflow.com','vinoth','some','duraivinoth001@gmail.com','1231231232',0,NULL,'2020-04-04 23:11:23',2,'$2a$10$.1NFk9RO/mL6Ej5kdz6Dpuv1yGBjV.yCkC6TWy6y9DsTALp9KKxPW',NULL,0,'2020-04-04 16:09:58','tamilnadu','India','Male','+91','1,2,3,4','1,2,3,4',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
