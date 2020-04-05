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

/*Table structure for table `post_actions` */

DROP TABLE IF EXISTS `post_actions`;

CREATE TABLE `post_actions` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `post_UID` varchar(255) DEFAULT NULL,
  `U_UID` varchar(255) DEFAULT NULL,
  `is_like` tinyint(4) DEFAULT '0',
  `is_favorite` tinyint(4) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_delete` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `post_actions` */

insert  into `post_actions`(`id`,`post_UID`,`U_UID`,`is_like`,`is_favorite`,`created_at`,`updated_at`,`is_delete`) values 
(1,'6da34d52-1b98-454e-8669-0a059a54191e','cb62dbae-6bcc-4d58-8161-944909b1f2e0',1,1,'2020-04-05 04:27:28','2020-04-05 04:39:13',0),
(2,'6da34d52-1b98-454e-8669-0a059a54191e','edd27110-5cb8-40c7-84df-fc4d4178eed2',1,1,'2020-04-05 04:39:26','2020-04-05 04:39:28',0);

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

/*Table structure for table `user_follow` */

DROP TABLE IF EXISTS `user_follow`;

CREATE TABLE `user_follow` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `follower_id` varchar(255) DEFAULT NULL,
  `following_id` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_follow` */

insert  into `user_follow`(`id`,`follower_id`,`following_id`,`created_at`,`updated_at`) values 
(3,'edd27110-5cb8-40c7-84df-fc4d4178eed2','984a9e5c-0a0e-4350-b549-c6e98e1f0da0',NULL,NULL),
(5,'cb62dbae-6bcc-4d58-8161-944909b1f2e0','984a9e5c-0a0e-4350-b549-c6e98e1f0da0',NULL,NULL),
(7,'7cfdd6d8-67e0-4c27-a77f-492d098ba3ad','cb62dbae-6bcc-4d58-8161-944909b1f2e0','2020-04-05 03:05:17','2020-04-05 03:05:17'),
(8,'7cfdd6d8-67e0-4c27-a77f-492d098ba3ad','ec069053-5895-46ab-a386-3da1ded3fd86','2020-04-05 03:05:33','2020-04-05 03:05:33'),
(9,'984a9e5c-0a0e-4350-b549-c6e98e1f0da0','7cfdd6d8-67e0-4c27-a77f-492d098ba3ad','2020-04-05 03:11:56','2020-04-05 03:11:56');

/*Table structure for table `user_post` */

DROP TABLE IF EXISTS `user_post`;

CREATE TABLE `user_post` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `post_by` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_delete` tinyint(4) DEFAULT '0',
  `post_UID` varchar(255) DEFAULT NULL,
  `post_detail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_post` */

insert  into `user_post`(`id`,`post_by`,`video_url`,`thumbnail_url`,`created_at`,`updated_at`,`is_delete`,`post_UID`,`post_detail`) values 
(1,NULL,'test','asdf',NULL,NULL,0,NULL,NULL),
(2,'cb62dbae-6bcc-4d58-8161-944909b1f2e0','test','asdf','2020-04-05 01:39:08','2020-04-05 03:18:54',1,NULL,NULL),
(3,'cb62dbae-6bcc-4d58-8161-944909b1f2e0','test','asdf','2020-04-05 01:41:01','2020-04-05 03:26:52',1,'432837ae-3ab5-49f9-b63b-c07ee650c6d0',NULL),
(4,'cb62dbae-6bcc-4d58-8161-944909b1f2e0','test','asdf','2020-04-05 02:14:42','2020-04-05 03:30:25',1,'b772fac4-ed87-4107-82ea-123b25600bf9','adfadf'),
(5,'cb62dbae-6bcc-4d58-8161-944909b1f2e0','test','asdf','2020-04-05 03:58:29','2020-04-05 03:58:29',0,'6da34d52-1b98-454e-8669-0a059a54191e','adfadf'),
(6,'cb62dbae-6bcc-4d58-8161-944909b1f2e0','test','asdf','2020-04-05 04:24:21','2020-04-05 04:24:21',0,'9c41291e-a487-4227-a0e8-520e2adbeb3b','adfadf');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `U_UID` varchar(255) NOT NULL,
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
  PRIMARY KEY (`id`,`U_UID`,`U_name`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `users` */

insert  into `users`(`id`,`U_UID`,`U_name`,`website`,`user_name`,`bio`,`email`,`phone_number`,`is_delete`,`created_at`,`updated_at`,`role_id`,`encrypted_password`,`profile_img`,`TC_accepted`,`DOB`,`state`,`country`,`gender`,`country_code`,`interests`,`professions`,`OTP`) values 
(4,'cb62dbae-6bcc-4d58-8161-944909b1f2e0','durai','https://stackoverflow.com','vinoth','some','duraivinoth001@gmail.com','1231231232',0,NULL,'2020-04-04 23:11:23',2,'$2a$10$.1NFk9RO/mL6Ej5kdz6Dpuv1yGBjV.yCkC6TWy6y9DsTALp9KKxPW',NULL,0,'2020-04-04 16:09:58','tamilnadu','India','Male','+91','1,2,3,4','1,2,3,4',NULL),
(5,'ec069053-5895-46ab-a386-3da1ded3fd86','durai001',NULL,'vinoth','some','durai@yopmail.com','1231231232',0,NULL,NULL,2,'$2a$10$LaHHUXAOFFJuoAC7bJVzQerxrY80Hv9RmL9clYbpC8Dco90I5m1ge',NULL,0,'2020-04-04 16:09:58','tamilnadu','India','Male','+91',NULL,NULL,NULL),
(6,'77c9d0cb-eb5a-4045-97eb-681bd38d812f','vinoth',NULL,'vinoth','some','vinoth@yopmail.com','1231231232',0,NULL,NULL,2,'$2a$10$M8O6232k8/gOyl1flNq2KeF/VtX8cPPpcS/aMd8Ttv8BK6mSSSSCi',NULL,0,'2020-04-04 16:09:58','tamilnadu','India','Male','+91',NULL,NULL,NULL),
(7,'984a9e5c-0a0e-4350-b549-c6e98e1f0da0','ram',NULL,'vinoth','some','ram@yopmail.com','1231231232',0,NULL,NULL,2,'$2a$10$GjfNWjCpM01eEefTCbwhSu4VJST6jVPKy5gscQLUw3AlJWFNZE/oS',NULL,0,'2020-04-04 16:09:58','tamilnadu','India','Male','+91',NULL,NULL,NULL),
(8,'edd27110-5cb8-40c7-84df-fc4d4178eed2','dinesh',NULL,'vinoth','some','dinesh@yopmail.com','1231231232',0,NULL,NULL,2,'$2a$10$9.S1JUoJtDqIFZYPgPkIdOVg/d0KSn.U6u/3dkkgE/jgcPTE1IJOS',NULL,0,'2020-04-04 16:09:58','tamilnadu','India','Male','+91',NULL,NULL,NULL),
(9,'7cfdd6d8-67e0-4c27-a77f-492d098ba3ad','karthik',NULL,'vinoth','some','karthick@yopmail.com','1231231232',0,NULL,'2020-04-05 01:10:27',2,'$2a$10$enY8rB6y2O1D29rYavEoVuKSP7YGAp0RwbEpDD3Z1gQshoL.2g.Au',NULL,0,'2020-04-04 16:09:58','tamilnadu','India','Male','+91',NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
