-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: vinid_hackathon
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer_action`
--

DROP TABLE IF EXISTS `customer_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `customer_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `machine_action_id` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_action_machine_action_fk` (`machine_action_id`),
  KEY `customer_action_user_fk` (`customer_id`),
  CONSTRAINT `customer_action_machine_action_fk` FOREIGN KEY (`machine_action_id`) REFERENCES `machine_action` (`id`),
  CONSTRAINT `customer_action_user_fk` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_action`
--

LOCK TABLES `customer_action` WRITE;
/*!40000 ALTER TABLE `customer_action` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formula_payment`
--

DROP TABLE IF EXISTS `formula_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `formula_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_id` int(11) NOT NULL,
  `formular` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `formula_payment_machine_action_fk` (`action_id`),
  CONSTRAINT `formula_payment_machine_action_fk` FOREIGN KEY (`action_id`) REFERENCES `machine_action` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formula_payment`
--

LOCK TABLES `formula_payment` WRITE;
/*!40000 ALTER TABLE `formula_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `formula_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `immediate_payment`
--

DROP TABLE IF EXISTS `immediate_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `immediate_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_id` int(11) NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `immediate_payment_machine_action_fk` (`action_id`),
  CONSTRAINT `immediate_payment_machine_action_fk` FOREIGN KEY (`action_id`) REFERENCES `machine_action` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `immediate_payment`
--

LOCK TABLES `immediate_payment` WRITE;
/*!40000 ALTER TABLE `immediate_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `immediate_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machine`
--

DROP TABLE IF EXISTS `machine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `machine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `api_path` longtext NOT NULL,
  `address` longtext NOT NULL,
  `seller` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `machine_user_fk` (`seller`),
  CONSTRAINT `machine_user_fk` FOREIGN KEY (`seller`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine`
--

LOCK TABLES `machine` WRITE;
/*!40000 ALTER TABLE `machine` DISABLE KEYS */;
/*!40000 ALTER TABLE `machine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `machine_action`
--

DROP TABLE IF EXISTS `machine_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `machine_action` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `machine_id` int(11) NOT NULL,
  `action_name` text,
  `value_type` text NOT NULL,
  `parrent_id` int(11) DEFAULT NULL,
  `min_value` int(11) NOT NULL DEFAULT '0',
  `max_value` int(11) NOT NULL DEFAULT '1',
  `pay_type_id` int(11) NOT NULL,
  `information` text,
  `remain` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `machine_action_machine_action_fk` (`parrent_id`),
  KEY `machine_action_machine_fk` (`machine_id`),
  KEY `machine_action_pay_type_fk` (`pay_type_id`),
  CONSTRAINT `machine_action_machine_action_fk` FOREIGN KEY (`parrent_id`) REFERENCES `machine_action` (`id`),
  CONSTRAINT `machine_action_machine_fk` FOREIGN KEY (`machine_id`) REFERENCES `machine` (`id`),
  CONSTRAINT `machine_action_pay_type_fk` FOREIGN KEY (`pay_type_id`) REFERENCES `pay_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `machine_action`
--

LOCK TABLES `machine_action` WRITE;
/*!40000 ALTER TABLE `machine_action` DISABLE KEYS */;
/*!40000 ALTER TABLE `machine_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_type`
--

DROP TABLE IF EXISTS `pay_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pay_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pay_type_name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_type`
--

LOCK TABLES `pay_type` WRITE;
/*!40000 ALTER TABLE `pay_type` DISABLE KEYS */;
INSERT INTO `pay_type` VALUES (1,'Thanh toán ngay'),(2,'Dùng vé'),(3,'Tính tiền theo giờ'),(4,'Dùng công thức');
/*!40000 ALTER TABLE `pay_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_by_usage_time`
--

DROP TABLE IF EXISTS `payment_by_usage_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `payment_by_usage_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_id` int(11) NOT NULL,
  `from` int(11) DEFAULT NULL,
  `to` int(11) DEFAULT NULL,
  `price_per_hour` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_by_usage_time_machine_action_fk` (`action_id`),
  CONSTRAINT `payment_by_usage_time_machine_action_fk` FOREIGN KEY (`action_id`) REFERENCES `machine_action` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_by_usage_time`
--

LOCK TABLES `payment_by_usage_time` WRITE;
/*!40000 ALTER TABLE `payment_by_usage_time` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_by_usage_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_user_type_fk` (`user_type`),
  CONSTRAINT `user_user_type_fk` FOREIGN KEY (`user_type`) REFERENCES `user_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'customer'),(2,'seller');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'vinid_hackathon'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-21 19:58:59
