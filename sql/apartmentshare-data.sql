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
INSERT INTO `auth_tokens` VALUES ('ãÙ’®:å¥:\0#¥lŒ','å®ò®:å¥:\0#¥lŒ'),('uß¡¿å«õ\0#¥lŒ','WQ3‰®:å¥:\0#¥lŒ'),('.Jã\"¡Àå«õ\0#¥lŒ','.L»ä¡Àå«õ\0#¥lŒ'),('T­·y¡Ãå«õ\0#¥lŒ','T°Q¡Ãå«õ\0#¥lŒ'),('Šù\Z®0å¥:\0#¥lŒ','Š ­Ø®0å¥:\0#¥lŒ'),('ÿˆù•¡Êå«õ\0#¥lŒ','ÿŒUš¡Êå«õ\0#¥lŒ');
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
INSERT INTO `campus_upc` VALUES ('1¢¢¹Xå8\0#¥lŒ','EETAC2','Av. del Canal Olimpic, 7 08860 Castelldefels Barcelona, EspaÃ±a',41.27210235595703,1.99207901954651),('y˜I¡Ğå«õ\0#¥lŒ','EETAC','Av. del Canal Olimpic, 7 08860 Castelldefels Barcelona, EspaÃ±a',41.27210235595703,1.99207901954651),('´ˆì.¹Wå8\0#¥lŒ','EETAC2','Av. del Canal Olimpic, 7 08860 Castelldefels Barcelona, EspaÃ±a',41.27210235595703,1.99207901954651);
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
INSERT INTO `flat` VALUES ('ÀÚG§úå‘4\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','y˜I¡Ğå«õ\0#¥lŒ',4,1,2,0,82,1,3,2,1,4,1,200,3,'Pompeu Fabra 240, Castelldefels','Piso soleado de maÃ±ana a tardes, bien comunicado en tres y autobus','2015-12-29 17:56:34','2015-12-21 16:46:33'),('	kJ¬¯å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','y˜I¡Ğå«õ\0#¥lŒ',6,0,2,0,145,1,6,2,0,3,1,275,4,'Carrer Manresa, 21, Castelldefels, Barcelona','Piso reformado','2015-12-29 18:03:23','2015-12-27 16:32:28'),('$€“¨%å‘¸\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','y˜I¡Ğå«õ\0#¥lŒ',4,2,2,1,82,1,3,2,1,4,1,200,3,'Pompeu Fabra 20, Castelldefels','Piso soleado de maÃ±ana a tardes, bien comunicado en tres y autobus','2015-12-29 17:57:51','2015-12-21 21:55:18'),('4ÒZ¬¬­å–\0#¥lŒ','uß¡¿å«õ\0#¥lŒ','y˜I¡Ğå«õ\0#¥lŒ',3,2,1,0,95,1,3,1,1,2,1,215,3,'Carrer de la CoruÃ±a, 28, Castelldefels, Barcelona','Piso soleado de maÃ±ana a tardes, bien comunicado en tres y autobus','2015-12-29 17:57:51','2015-12-27 16:19:22'),('ö+ì¬­å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','y˜I¡Ğå«õ\0#¥lŒ',2,1,1,1,45,1,2,1,0,0,0,175,6,'Carrer Molinot, 9,  Castelldefels, Barcelona','Piso soleado de maÃ±ana a tardes, bien comunicado en tres y autobus','2015-12-27 15:21:54','2015-12-27 16:21:54'),('¡Z;Ì¨%å‘¸\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','y˜I¡Ğå«õ\0#¥lŒ',4,2,2,0,82,1,3,2,1,4,1,200,3,'Pompeu Fabra 18, Castelldefels','Piso soleado de maÃ±ana a tardes, bien comunicado en tres y autobus','2015-12-29 17:59:31','2015-12-21 21:58:47'),('ş.a¬¬å–\0#¥lŒ','uß¡¿å«õ\0#¥lŒ','y˜I¡Ğå«õ\0#¥lŒ',2,1,0,2,74,1,2,1,0,1,1,200,2,'Carrer de Joaquim Folguera, 23, GavÃ , Barcelona','Piso soleado de maÃ±ana a tardes, bien comunicado en tres y autobus','2015-12-27 15:17:51','2015-12-27 16:17:51');
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
  `filename` varchar(100) NOT NULL,
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
INSERT INTO `imagenflat` VALUES (')D´µôåÚ\0#¥lŒ','	kJ¬¯å–\0#¥lŒ','e0348111-4c3c-48d1-88e5-dc37f465c175.png'),('>Ñ2µôåÚ\0#¥lŒ','ö+ì¬­å–\0#¥lŒ','559c1eea-6a23-4c54-a2de-e1e515b50b08.png'),('q¶\'µµmåÚ\0#¥lŒ','4ÒZ¬¬­å–\0#¥lŒ','5ef926a5-60a2-45e6-abf2-97c24b26a6fd.png'),('åLà#µóåÚ\0#¥lŒ','¡Z;Ì¨%å‘¸\0#¥lŒ','d37c1a20-5754-4674-962c-def191da986c.png'),('ñ µóåÚ\0#¥lŒ','ÀÚG§úå‘4\0#¥lŒ','b7fe3c97-b18e-4f5e-a9a3-30cae2d3fb0d.png');
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
  `filename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roomid` (`roomid`),
  CONSTRAINT `imagenroom_ibfk_1` FOREIGN KEY (`roomid`) REFERENCES `room` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenroom`
--

LOCK TABLES `imagenroom` WRITE;
/*!40000 ALTER TABLE `imagenroom` DISABLE KEYS */;
INSERT INTO `imagenroom` VALUES ('*ck¾µååÚ\0#¥lŒ','\',Í€¬±å–\0#¥lŒ','f53b9392-af16-4a45-a6c9-fd4af7764fc2.png'),('-Ñ\"uµ=åÚ\0#¥lŒ','6<dJ¬±å–\0#¥lŒ','18a56d37-5e83-45e2-84fc-262d43632457.png'),('3J‹ãµååÚ\0#¥lŒ','JF=¬±å–\0#¥lŒ','9896f30b-1683-4dd6-adea-0a235711454f.png'),('L‰F¦µååÚ\0#¥lŒ','Îk!6¬±å–\0#¥lŒ','68b8fbbc-2529-46a9-861b-82c3d7ec08e0.png'),('QÕØ_µååÚ\0#¥lŒ','½ıæ¬±å–\0#¥lŒ','c77c9313-bb09-4ce7-af21-d72d8df5b2bb.png'),('VúXµååÚ\0#¥lŒ','œš€#¬±å–\0#¥lŒ','a0b32c35-19b3-41b3-8e81-ec420ccf8bf3.png'),('\\V”µååÚ\0#¥lŒ','«½;…¬±å–\0#¥lŒ','9a322176-0b57-411f-8522-5a6ff002e88f.png'),('sğI«µååÚ\0#¥lŒ','ÍyƒA¨Âå\0#¥lŒ','258f185d-41f1-4d75-b3d6-db5b98971279.png'),('z{Ö‡µååÚ\0#¥lŒ','ÎÔÖ{¨Âå\0#¥lŒ','229c66dd-5604-459e-a6f5-3d6af3c68610.png'),('{•jzµmåÚ\0#¥lŒ','6<dJ¬±å–\0#¥lŒ','40e64d1a-5d42-4e45-b8f8-68449d0e8039.png'),('€7µååÚ\0#¥lŒ','Ì#åï¨Âå\0#¥lŒ','37f0bcdc-7818-436c-8b6b-99034c455ff1.png'),('ç\'¥µéåÚ\0#¥lŒ','ÎÔÖ{¨Âå\0#¥lŒ','7077fef5-fd06-4da1-a13f-955c2b1b257f.png'),('ó½½?·„å‘×\0#¥lŒ','Ò¶ù¨Àå\0#¥lŒ','29409adf-5a71-4588-87d4-349db62caccd.png');
/*!40000 ALTER TABLE `imagenroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` binary(16) NOT NULL,
  `fromuser` binary(16) NOT NULL,
  `touser` binary(16) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `creation_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fromuser` (`fromuser`),
  KEY `touser` (`touser`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`fromuser`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`touser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('?ªP¶èåœ~\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 16:45:31'),('Ğåã¶êåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 16:59:59'),('\\Ä·}å‘×\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','Esto es un mensaje de prueba tb 3','2016-01-10 10:32:41'),('K~À¶ëåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 17:07:46'),('&n·®·}å‘×\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba tb 3','2016-01-10 10:33:04'),('K\'È¶ëåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 17:09:00'),('K(¯D¶éåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 16:54:41'),('`§•¶ëåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 17:09:36'),('b:¾¿¶èåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 16:48:10'),('dğı¶éåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 16:55:23'),('q5Ÿ·‡å‘×\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba de email para el replyto','2016-01-10 11:46:45'),('rã‚ò¶ëåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 17:10:06'),('{àñ·„å‘×\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba de email que se grabarÃ¡ tambiÃ©n como mensaje','2016-01-10 11:25:34'),('ƒ¯ó·„å‘×\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba de email que se grabarÃ¡ tambiÃ©n como mensaje','2016-01-10 11:25:47'),('İüø·zå‘×\0#¥lŒ','uß¡¿å«õ\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','Esto es un mensaje de prueba tb','2016-01-10 10:14:34'),('‘IwŠ·zå‘×\0#¥lŒ','uß¡¿å«õ\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','Esto es un mensaje de prueba tb','2016-01-10 10:14:35'),('‘¶‘Ò·zå‘×\0#¥lŒ','uß¡¿å«õ\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','Esto es un mensaje de prueba tb','2016-01-10 10:14:36'),('•úÙ·zå‘×\0#¥lŒ','uß¡¿å«õ\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba tb','2016-01-10 10:14:41'),('•PĞ\Z·zå‘×\0#¥lŒ','uß¡¿å«õ\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba tb','2016-01-10 10:14:42'),('´±²·zå‘×\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba tb 2','2016-01-10 10:14:56'),('w>·zå‘×\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba tb 2','2016-01-10 10:14:56'),('P?>·zå‘×\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba tb 2','2016-01-10 10:14:57'),('¡”ç­·yå‘×\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','Esto es un mensaje de prueba tb','2016-01-10 10:07:53'),('¢Ñ÷·zå‘×\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','Esto es un mensaje de prueba tb 3','2016-01-10 10:15:03'),('¢‚Èø·zå‘×\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','Esto es un mensaje de prueba tb 3','2016-01-10 10:15:04'),('¢âB8·zå‘×\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ','Esto es un mensaje de prueba tb 3','2016-01-10 10:15:05'),('Ù^y³¶èåœ~\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba','2016-01-09 16:51:30'),('ù<Y¶·„å‘×\0#¥lŒ','Šù\Z®0å¥:\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ','Esto es un mensaje de prueba de email que se grabarÃ¡ tambiÃ©n como mensaje','2016-01-10 11:29:05');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
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
INSERT INTO `room` VALUES ('	KÀ¼¬±å–\0#¥lŒ','ş.a¬¬å–\0#¥lŒ','uß¡¿å«õ\0#¥lŒ',2,9,0,1,200,'Cerca de la playa','2015-12-29 18:13:25','2015-12-27 16:46:47'),('\',Í€¬±å–\0#¥lŒ','4ÒZ¬¬­å–\0#¥lŒ','uß¡¿å«õ\0#¥lŒ',1,12,1,1,275,'Vistas amplias','2015-12-27 15:47:37','2015-12-27 16:47:37'),('0‚nO¨¼å\0#¥lŒ','$€“¨%å‘¸\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ',1,16,1,1,350,'Muy iluminado en verano','2015-12-27 15:38:25','2015-12-22 15:56:32'),('6<dJ¬±å–\0#¥lŒ','4ÒZ¬¬­å–\0#¥lŒ','uß¡¿å«õ\0#¥lŒ',1,10,1,0,215,'HabitaciÃ³n bien distribuida','2015-12-27 15:48:03','2015-12-27 16:48:03'),('<=â–¨¼å\0#¥lŒ','$€“¨%å‘¸\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ',1,10,1,1,300,'Muy iluminado en verano','2015-12-29 18:14:07','2015-12-22 15:56:52'),('JF=¬±å–\0#¥lŒ','4ÒZ¬¬­å–\0#¥lŒ','uß¡¿å«õ\0#¥lŒ',1,8,0,1,200,'Silenciosa y confortable','2015-12-27 15:48:37','2015-12-27 16:48:37'),('eÓèù¬±å–\0#¥lŒ','ö+ì¬­å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ',1,18,1,1,350,'Paraiso','2015-12-29 18:13:51','2015-12-27 16:49:23'),('uˆ˜â¬±å–\0#¥lŒ','ö+ì¬­å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ',1,15,1,1,325,'Paraiso terrenal','2015-12-29 18:13:51','2015-12-27 16:49:49'),('œš€#¬±å–\0#¥lŒ','	kJ¬¯å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ',1,9,1,1,225,'Acogedora','2015-12-27 15:50:55','2015-12-27 16:50:55'),('«½;…¬±å–\0#¥lŒ','	kJ¬¯å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ',2,7,1,1,235,'Encantadora','2015-12-27 15:51:20','2015-12-27 16:51:20'),('½ıæ¬±å–\0#¥lŒ','	kJ¬¯å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ',1,9,1,1,255,'Ideal estudiantes, muy silenciosa','2015-12-27 15:51:51','2015-12-27 16:51:51'),('Ì#åï¨Âå\0#¥lŒ','¡Z;Ì¨%å‘¸\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ',1,8,1,0,275,'Muy iluminado en verano','2015-12-22 15:43:50','2015-12-22 16:43:50'),('ÍyƒA¨Âå\0#¥lŒ','¡Z;Ì¨%å‘¸\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ',1,8,1,1,275,'Muy iluminado en verano','2015-12-27 15:40:59','2015-12-22 16:43:53'),('Îk!6¬±å–\0#¥lŒ','	kJ¬¯å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ',1,9,1,0,300,'Vistas al mar y montaÃ±a','2015-12-27 15:52:18','2015-12-27 16:52:18'),('ÎÔÖ{¨Âå\0#¥lŒ','¡Z;Ì¨%å‘¸\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ',1,8,1,1,275,'Muy iluminado en verano','2015-12-27 15:41:16','2015-12-22 16:43:55'),('ÏWB¨Âå\0#¥lŒ','ÀÚG§úå‘4\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ',1,8,1,1,275,'Muy iluminado en verano','2015-12-27 15:41:33','2015-12-22 16:43:56'),('Ò¶ù¨Àå\0#¥lŒ','ÀÚG§úå‘4\0#¥lŒ','.Jã\"¡Àå«õ\0#¥lŒ',1,9,1,0,275,'Muy iluminado en verano','2015-12-27 15:39:55','2015-12-22 16:29:41'),('åpX2¬±å–\0#¥lŒ','	kJ¬¯å–\0#¥lŒ','T­·y¡Ãå«õ\0#¥lŒ',2,14,1,1,400,'Con terraza individual','2015-12-27 15:52:57','2015-12-27 16:52:57'),('ù ‰Ö¬°å–\0#¥lŒ','ş.a¬¬å–\0#¥lŒ','uß¡¿å«õ\0#¥lŒ',2,5,0,1,150,'Cerca de la playa','2015-12-29 18:13:25','2015-12-27 16:46:20');
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
INSERT INTO `user_roles` VALUES ('ãÙ’®:å¥:\0#¥lŒ','registered'),('uß¡¿å«õ\0#¥lŒ','registered'),('.Jã\"¡Àå«õ\0#¥lŒ','registered'),('T­·y¡Ãå«õ\0#¥lŒ','registered'),('Šù\Z®0å¥:\0#¥lŒ','registered'),('ÿˆù•¡Êå«õ\0#¥lŒ','administrator');
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
INSERT INTO `users` VALUES ('ãÙ’®:å¥:\0#¥lŒ','Pedro','Ü›ÛRĞMÂ\06ÛØ1>ĞU','Pedro Sanchez','pedro@apartmentshare.eetac.upc.edu','222333777'),('uß¡¿å«õ\0#¥lŒ','jordi','Ü›ÛRĞMÂ\06ÛØ1>ĞU','Jordi LÃ³pez','jordi@apartmentshare.eetac.upc.edu','666555444'),('.Jã\"¡Àå«õ\0#¥lŒ','marcelus','Ü›ÛRĞMÂ\06ÛØ1>ĞU','Marcelus Zeron','marcelus@apartmentshare.eetac.upc.edu','777888999'),('T­·y¡Ãå«õ\0#¥lŒ','Ruben','Ü›ÛRĞMÂ\06ÛØ1>ĞU','Ruben Molina','ruben@apartmentshare.eetac.upc.edu','666555111'),('Šù\Z®0å¥:\0#¥lŒ','Victor','Ü›ÛRĞMÂ\06ÛØ1>ĞU','Victor Perez','victor@apartmentshare.eetac.upc.edu','543987561'),('ÿˆù•¡Êå«õ\0#¥lŒ','admin','Ü›ÛRĞMÂ\06ÛØ1>ĞU','admin','admin@apartmentshare.eetac,upc.edu','666666666');
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

-- Dump completed on 2016-01-12 19:55:26
