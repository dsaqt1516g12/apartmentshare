-- MySQL dump 10.13  Distrib 5.6.26, for Win64 (x86_64)
--
-- Host: localhost    Database: apartmentsharedb
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_tokens`
--

DROP TABLE IF EXISTS `auth_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_tokens` (
  `userid` binary(16) NOT NULL,
  `token` binary(16) NOT NULL,
  PRIMARY KEY (`token`),
  KEY `userid` (`userid`),
  CONSTRAINT `auth_tokens_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_tokens`
--

LOCK TABLES `auth_tokens` WRITE;
/*!40000 ALTER TABLE `auth_tokens` DISABLE KEYS */;
INSERT INTO `auth_tokens` VALUES ('uﬂ°øÂ´ı\0#•lå','LÊxßÙÂë4\0#•lå'),('.J„\"°¿Â´ı\0#•lå','.Lª‰°¿Â´ı\0#•lå'),('T≠∑y°√Â´ı\0#•lå','T∞Q°√Â´ı\0#•lå'),('ˇà˘ï° Â´ı\0#•lå','ˇåUö° Â´ı\0#•lå');
/*!40000 ALTER TABLE `auth_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus_upc`
--

DROP TABLE IF EXISTS `campus_upc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campus_upc` (
  `id` binary(16) NOT NULL,
  `campusname` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `longitud` float(17,14) NOT NULL,
  `latitud` float(17,14) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus_upc`
--

LOCK TABLES `campus_upc` WRITE;
/*!40000 ALTER TABLE `campus_upc` DISABLE KEYS */;
INSERT INTO `campus_upc` VALUES ('yòI°–Â´ı\0#•lå','EETAC','Av. del Canal Olimpic, 7 08860 Castelldefels Barcelona, Espa√±a',41.27210235595703,1.99207901954651);
/*!40000 ALTER TABLE `campus_upc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flat`
--

DROP TABLE IF EXISTS `flat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flat` (
  `id` binary(16) NOT NULL,
  `userid` binary(16) NOT NULL,
  `campusid` binary(16) NOT NULL,
  `numpartner` int(11) NOT NULL,
  `smoker` int(11) NOT NULL,
  `pets` int(11) NOT NULL,
  `girlorboy` int(11) NOT NULL,
  `sqm` int(11) NOT NULL,
  `furnished` int(11) NOT NULL,
  `numrooms` int(11) NOT NULL,
  `numbathrooms` int(11) NOT NULL,
  `elevator` int(11) NOT NULL,
  `plantnum` int(11) NOT NULL,
  `internet` int(11) NOT NULL,
  `fianza` int(11) NOT NULL,
  `estancia` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creation_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `campusid` (`campusid`),
  CONSTRAINT `flat_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `flat_ibfk_2` FOREIGN KEY (`campusid`) REFERENCES `campus_upc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flat`
--

LOCK TABLES `flat` WRITE;
/*!40000 ALTER TABLE `flat` DISABLE KEYS */;
INSERT INTO `flat` VALUES ('¿⁄Gß˙Âë4\0#•lå','.J„\"°¿Â´ı\0#•lå','yòI°–Â´ı\0#•lå',4,1,0,1,82,1,3,2,1,4,1,200,3,'Pompeu Fabra 240, Castelldefels','Piso soleado de ma√±ana a tardes, bien comunicado en tres y autobus','2015-12-22 15:10:30','2015-12-21 16:46:33'),('	kJ¨ØÂñ\0#•lå','T≠∑y°√Â´ı\0#•lå','yòI°–Â´ı\0#•lå',6,1,1,1,145,1,6,2,0,3,1,275,4,'Carrer Manresa, 21, Castelldefels, Barcelona','Piso reformado','2015-12-27 15:32:28','2015-12-27 16:32:28'),('$Äì®%Âë∏\0#•lå','.J„\"°¿Â´ı\0#•lå','yòI°–Â´ı\0#•lå',4,0,0,1,82,1,3,2,1,4,1,200,3,'Pompeu Fabra 20, Castelldefels','Piso soleado de ma√±ana a tardes, bien comunicado en tres y autobus','2015-12-21 20:55:18','2015-12-21 21:55:18'),('4“Z¨¨≠Âñ\0#•lå','uﬂ°øÂ´ı\0#•lå','yòI°–Â´ı\0#•lå',3,0,1,1,95,1,3,1,1,2,1,215,3,'Carrer de la Coru√±a, 28, Castelldefels, Barcelona','Piso soleado de ma√±ana a tardes, bien comunicado en tres y autobus','2015-12-27 15:19:22','2015-12-27 16:19:22'),('éˆ+Ï¨≠Âñ\0#•lå','T≠∑y°√Â´ı\0#•lå','yòI°–Â´ı\0#•lå',2,1,1,1,45,1,2,1,0,0,0,175,6,'Carrer Molinot, 9,  Castelldefels, Barcelona','Piso soleado de ma√±ana a tardes, bien comunicado en tres y autobus','2015-12-27 15:21:54','2015-12-27 16:21:54'),('°Z;Ã®%Âë∏\0#•lå','.J„\"°¿Â´ı\0#•lå','yòI°–Â´ı\0#•lå',4,0,0,1,82,1,3,2,1,4,1,200,3,'Pompeu Fabra 18, Castelldefels','Piso soleado de ma√±ana a tardes, bien comunicado en tres y autobus','2015-12-21 20:58:47','2015-12-21 21:58:47'),('˛.a¨¨Âñ\0#•lå','uﬂ°øÂ´ı\0#•lå','yòI°–Â´ı\0#•lå',2,1,0,2,74,1,2,1,0,1,1,200,2,'Carrer de Joaquim Folguera, 23, Gav√†, Barcelona','Piso soleado de ma√±ana a tardes, bien comunicado en tres y autobus','2015-12-27 15:17:51','2015-12-27 16:17:51');
/*!40000 ALTER TABLE `flat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenflat`
--

DROP TABLE IF EXISTS `imagenflat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagenflat` (
  `id` binary(16) NOT NULL,
  `flatid` binary(16) NOT NULL,
  `title` varchar(100) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `imageURL` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `flatid` (`flatid`),
  CONSTRAINT `imagenflat_ibfk_1` FOREIGN KEY (`flatid`) REFERENCES `flat` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenflat`
--

LOCK TABLES `imagenflat` WRITE;
/*!40000 ALTER TABLE `imagenflat` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenflat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenroom`
--

DROP TABLE IF EXISTS `imagenroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagenroom` (
  `id` binary(16) NOT NULL,
  `roomid` binary(16) NOT NULL,
  `imageURL` varchar(1000) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  KEY `id` (`id`),
  KEY `roomid` (`roomid`),
  CONSTRAINT `imagenroom_ibfk_1` FOREIGN KEY (`id`) REFERENCES `imagenflat` (`id`) ON DELETE CASCADE,
  CONSTRAINT `imagenroom_ibfk_2` FOREIGN KEY (`roomid`) REFERENCES `room` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenroom`
--

LOCK TABLES `imagenroom` WRITE;
/*!40000 ALTER TABLE `imagenroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagenroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `id` binary(16) NOT NULL,
  `flatid` binary(16) NOT NULL,
  `userid` binary(16) NOT NULL,
  `girlorboy` int(11) NOT NULL,
  `sqm` int(11) NOT NULL,
  `furnished` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `creation_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `flatid` (`flatid`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `room_ibfk_2` FOREIGN KEY (`flatid`) REFERENCES `flat` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('	K¿º¨±Âñ\0#•lå','˛.a¨¨Âñ\0#•lå','uﬂ°øÂ´ı\0#•lå',1,9,0,1,200,'Cerca de la playa','2015-12-27 15:46:47','2015-12-27 16:46:47'),('\',ÕÄ¨±Âñ\0#•lå','4“Z¨¨≠Âñ\0#•lå','uﬂ°øÂ´ı\0#•lå',1,12,1,1,275,'Vistas amplias','2015-12-27 15:47:37','2015-12-27 16:47:37'),('0ÇnO®ºÂç\0#•lå','$Äì®%Âë∏\0#•lå','.J„\"°¿Â´ı\0#•lå',1,16,1,1,350,'Muy iluminado en verano','2015-12-27 15:38:25','2015-12-22 15:56:32'),('6<dJ¨±Âñ\0#•lå','4“Z¨¨≠Âñ\0#•lå','uﬂ°øÂ´ı\0#•lå',1,10,1,0,215,'Habitaci√≥n bien distribuida','2015-12-27 15:48:03','2015-12-27 16:48:03'),('<=‚ñ®ºÂç\0#•lå','$Äì®%Âë∏\0#•lå','.J„\"°¿Â´ı\0#•lå',2,10,1,1,300,'Muy iluminado en verano','2015-12-27 15:38:54','2015-12-22 15:56:52'),('JÅF=¨±Âñ\0#•lå','4“Z¨¨≠Âñ\0#•lå','uﬂ°øÂ´ı\0#•lå',1,8,0,1,200,'Silenciosa y confortable','2015-12-27 15:48:37','2015-12-27 16:48:37'),('e”Ë˘¨±Âñ\0#•lå','éˆ+Ï¨≠Âñ\0#•lå','T≠∑y°√Â´ı\0#•lå',0,18,1,1,350,'Paraiso','2015-12-27 15:49:23','2015-12-27 16:49:23'),('uàò‚¨±Âñ\0#•lå','éˆ+Ï¨≠Âñ\0#•lå','T≠∑y°√Â´ı\0#•lå',0,15,1,1,325,'Paraiso terrenal','2015-12-27 15:49:49','2015-12-27 16:49:49'),('úöÄ#¨±Âñ\0#•lå','	kJ¨ØÂñ\0#•lå','T≠∑y°√Â´ı\0#•lå',1,9,1,1,225,'Acogedora','2015-12-27 15:50:55','2015-12-27 16:50:55'),('´Ω;Ö¨±Âñ\0#•lå','	kJ¨ØÂñ\0#•lå','T≠∑y°√Â´ı\0#•lå',2,7,1,1,235,'Encantadora','2015-12-27 15:51:20','2015-12-27 16:51:20'),('Ω˝Ê¨±Âñ\0#•lå','	kJ¨ØÂñ\0#•lå','T≠∑y°√Â´ı\0#•lå',1,9,1,1,255,'Ideal estudiantes, muy silenciosa','2015-12-27 15:51:51','2015-12-27 16:51:51'),('Ã#ÂÔ®¬Âç\0#•lå','°Z;Ã®%Âë∏\0#•lå','.J„\"°¿Â´ı\0#•lå',1,8,1,0,275,'Muy iluminado en verano','2015-12-22 15:43:50','2015-12-22 16:43:50'),('ÕyÉA®¬Âç\0#•lå','°Z;Ã®%Âë∏\0#•lå','.J„\"°¿Â´ı\0#•lå',1,8,1,1,275,'Muy iluminado en verano','2015-12-27 15:40:59','2015-12-22 16:43:53'),('Œk!6¨±Âñ\0#•lå','	kJ¨ØÂñ\0#•lå','T≠∑y°√Â´ı\0#•lå',1,9,1,0,300,'Vistas al mar y monta√±a','2015-12-27 15:52:18','2015-12-27 16:52:18'),('Œ‘÷{®¬Âç\0#•lå','°Z;Ã®%Âë∏\0#•lå','.J„\"°¿Â´ı\0#•lå',1,8,1,1,275,'Muy iluminado en verano','2015-12-27 15:41:16','2015-12-22 16:43:55'),('œWB®¬Âç\0#•lå','¿⁄Gß˙Âë4\0#•lå','.J„\"°¿Â´ı\0#•lå',1,8,1,1,275,'Muy iluminado en verano','2015-12-27 15:41:33','2015-12-22 16:43:56'),('“∂˘®¿Âç\0#•lå','¿⁄Gß˙Âë4\0#•lå','.J„\"°¿Â´ı\0#•lå',1,9,1,0,275,'Muy iluminado en verano','2015-12-27 15:39:55','2015-12-22 16:29:41'),('ÂpX2¨±Âñ\0#•lå','	kJ¨ØÂñ\0#•lå','T≠∑y°√Â´ı\0#•lå',2,14,1,1,400,'Con terraza individual','2015-12-27 15:52:57','2015-12-27 16:52:57'),('˘ â÷¨∞Âñ\0#•lå','˛.a¨¨Âñ\0#•lå','uﬂ°øÂ´ı\0#•lå',1,5,0,1,150,'Cerca de la playa','2015-12-27 15:46:20','2015-12-27 16:46:20');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_roles` (
  `userid` binary(16) NOT NULL,
  `role` enum('registered','administrator') NOT NULL DEFAULT 'registered',
  PRIMARY KEY (`userid`,`role`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('uﬂ°øÂ´ı\0#•lå','registered'),('.J„\"°¿Â´ı\0#•lå','registered'),('T≠∑y°√Â´ı\0#•lå','registered'),('ˇà˘ï° Â´ı\0#•lå','administrator');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` binary(16) NOT NULL,
  `loginid` varchar(15) NOT NULL,
  `password` binary(16) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loginid` (`loginid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('uﬂ°øÂ´ı\0#•lå','jordi','Å‹õ€R–M¬\06€ÿ1>–U','Jordi L√≥pez','jordi@apartmentshare.eetac,upc.edu','666555444'),('.J„\"°¿Â´ı\0#•lå','marcelus','Å‹õ€R–M¬\06€ÿ1>–U','Marcelus Zeron','marcelus@apartmentshare.eetac,upc.edu','777888999'),('T≠∑y°√Â´ı\0#•lå','Ruben','Å‹õ€R–M¬\06€ÿ1>–U','Ruben Molina','ruben@apartmentshare.eetac,upc.edu','666555111'),('ˇà˘ï° Â´ı\0#•lå','admin','Å‹õ€R–M¬\06€ÿ1>–U','admin','admin@apartmentshare.eetac,upc.edu','666666666');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-28 19:44:02
