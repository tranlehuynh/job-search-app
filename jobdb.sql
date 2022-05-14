-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: jobdb
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_emailaddress`
--

DROP TABLE IF EXISTS `account_emailaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailaddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailaddress`
--

LOCK TABLES `account_emailaddress` WRITE;
/*!40000 ALTER TABLE `account_emailaddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_emailconfirmation`
--

DROP TABLE IF EXISTS `account_emailconfirmation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_emailconfirmation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_address_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_emailconfirmation`
--

LOCK TABLES `account_emailconfirmation` WRITE;
/*!40000 ALTER TABLE `account_emailconfirmation` DISABLE KEYS */;
/*!40000 ALTER TABLE `account_emailconfirmation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add category',7,'add_category'),(26,'Can change category',7,'change_category'),(27,'Can delete category',7,'delete_category'),(28,'Can view category',7,'view_category'),(29,'Can add company',8,'add_company'),(30,'Can change company',8,'change_company'),(31,'Can delete company',8,'delete_company'),(32,'Can view company',8,'view_company'),(33,'Can add job category',9,'add_jobcategory'),(34,'Can change job category',9,'change_jobcategory'),(35,'Can delete job category',9,'delete_jobcategory'),(36,'Can view job category',9,'view_jobcategory'),(37,'Can add rating',10,'add_rating'),(38,'Can change rating',10,'change_rating'),(39,'Can delete rating',10,'delete_rating'),(40,'Can view rating',10,'view_rating'),(41,'Can add job',11,'add_job'),(42,'Can change job',11,'change_job'),(43,'Can delete job',11,'delete_job'),(44,'Can view job',11,'view_job'),(45,'Can add cv online',12,'add_cvonline'),(46,'Can change cv online',12,'change_cvonline'),(47,'Can delete cv online',12,'delete_cvonline'),(48,'Can view cv online',12,'view_cvonline'),(49,'Can add comment',13,'add_comment'),(50,'Can change comment',13,'change_comment'),(51,'Can delete comment',13,'delete_comment'),(52,'Can view comment',13,'view_comment'),(53,'Can add action',14,'add_action'),(54,'Can change action',14,'change_action'),(55,'Can delete action',14,'delete_action'),(56,'Can view action',14,'view_action'),(57,'Can add company view',15,'add_companyview'),(58,'Can change company view',15,'change_companyview'),(59,'Can delete company view',15,'delete_companyview'),(60,'Can view company view',15,'view_companyview'),(61,'Can add application',16,'add_application'),(62,'Can change application',16,'change_application'),(63,'Can delete application',16,'delete_application'),(64,'Can view application',16,'view_application'),(65,'Can add access token',17,'add_accesstoken'),(66,'Can change access token',17,'change_accesstoken'),(67,'Can delete access token',17,'delete_accesstoken'),(68,'Can view access token',17,'view_accesstoken'),(69,'Can add grant',18,'add_grant'),(70,'Can change grant',18,'change_grant'),(71,'Can delete grant',18,'delete_grant'),(72,'Can view grant',18,'view_grant'),(73,'Can add refresh token',19,'add_refreshtoken'),(74,'Can change refresh token',19,'change_refreshtoken'),(75,'Can delete refresh token',19,'delete_refreshtoken'),(76,'Can view refresh token',19,'view_refreshtoken'),(77,'Can add id token',20,'add_idtoken'),(78,'Can change id token',20,'change_idtoken'),(79,'Can delete id token',20,'delete_idtoken'),(80,'Can view id token',20,'view_idtoken'),(81,'Can add site',21,'add_site'),(82,'Can change site',21,'change_site'),(83,'Can delete site',21,'delete_site'),(84,'Can view site',21,'view_site'),(85,'Can add email address',22,'add_emailaddress'),(86,'Can change email address',22,'change_emailaddress'),(87,'Can delete email address',22,'delete_emailaddress'),(88,'Can view email address',22,'view_emailaddress'),(89,'Can add email confirmation',23,'add_emailconfirmation'),(90,'Can change email confirmation',23,'change_emailconfirmation'),(91,'Can delete email confirmation',23,'delete_emailconfirmation'),(92,'Can view email confirmation',23,'view_emailconfirmation'),(93,'Can add social account',24,'add_socialaccount'),(94,'Can change social account',24,'change_socialaccount'),(95,'Can delete social account',24,'delete_socialaccount'),(96,'Can view social account',24,'view_socialaccount'),(97,'Can add social application',25,'add_socialapp'),(98,'Can change social application',25,'change_socialapp'),(99,'Can delete social application',25,'delete_socialapp'),(100,'Can view social application',25,'view_socialapp'),(101,'Can add social application token',26,'add_socialtoken'),(102,'Can change social application token',26,'change_socialtoken'),(103,'Can delete social application token',26,'delete_socialtoken'),(104,'Can view social application token',26,'view_socialtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2022-05-13 16:44:31.335365','1','Công nghệ thông tin',1,'[{\"added\": {}}]',7,1),(2,'2022-05-13 16:44:39.294509','2','Marketing',1,'[{\"added\": {}}]',7,1),(3,'2022-05-13 16:44:44.768568','3','Kinh tế',1,'[{\"added\": {}}]',7,1),(4,'2022-05-13 16:47:01.467436','1','admin',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Avatar\", \"Role\"]}}]',6,1),(5,'2022-05-13 16:47:54.430986','1','Fulltime',1,'[{\"added\": {}}]',9,1),(6,'2022-05-13 16:48:12.531554','2','Parttime',1,'[{\"added\": {}}]',9,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (22,'account','emailaddress'),(23,'account','emailconfirmation'),(1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(14,'jobs','action'),(7,'jobs','category'),(13,'jobs','comment'),(8,'jobs','company'),(15,'jobs','companyview'),(12,'jobs','cvonline'),(11,'jobs','job'),(9,'jobs','jobcategory'),(10,'jobs','rating'),(6,'jobs','user'),(17,'oauth2_provider','accesstoken'),(16,'oauth2_provider','application'),(18,'oauth2_provider','grant'),(20,'oauth2_provider','idtoken'),(19,'oauth2_provider','refreshtoken'),(5,'sessions','session'),(21,'sites','site'),(24,'socialaccount','socialaccount'),(25,'socialaccount','socialapp'),(26,'socialaccount','socialtoken');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2022-05-13 16:43:19.798136'),(2,'contenttypes','0002_remove_content_type_name','2022-05-13 16:43:19.862963'),(3,'auth','0001_initial','2022-05-13 16:43:20.094285'),(4,'auth','0002_alter_permission_name_max_length','2022-05-13 16:43:20.139163'),(5,'auth','0003_alter_user_email_max_length','2022-05-13 16:43:20.147143'),(6,'auth','0004_alter_user_username_opts','2022-05-13 16:43:20.153126'),(7,'auth','0005_alter_user_last_login_null','2022-05-13 16:43:20.162102'),(8,'auth','0006_require_contenttypes_0002','2022-05-13 16:43:20.165094'),(9,'auth','0007_alter_validators_add_error_messages','2022-05-13 16:43:20.172099'),(10,'auth','0008_alter_user_username_max_length','2022-05-13 16:43:20.180054'),(11,'auth','0009_alter_user_last_name_max_length','2022-05-13 16:43:20.186090'),(12,'auth','0010_alter_group_name_max_length','2022-05-13 16:43:20.200053'),(13,'auth','0011_update_proxy_permissions','2022-05-13 16:43:20.209032'),(14,'auth','0012_alter_user_first_name_max_length','2022-05-13 16:43:20.216042'),(15,'jobs','0001_initial','2022-05-13 16:43:21.160398'),(16,'account','0001_initial','2022-05-13 16:43:21.316424'),(17,'account','0002_email_max_length','2022-05-13 16:43:21.340261'),(18,'admin','0001_initial','2022-05-13 16:43:21.455773'),(19,'admin','0002_logentry_remove_auto_add','2022-05-13 16:43:21.467775'),(20,'admin','0003_logentry_add_action_flag_choices','2022-05-13 16:43:21.482733'),(21,'jobs','0002_companyview','2022-05-13 16:43:21.546531'),(22,'jobs','0003_alter_companyview_company','2022-05-13 16:43:21.647261'),(23,'jobs','0004_userapply_job_users_userapply_job_userapply_user','2022-05-13 16:43:21.817410'),(24,'jobs','0005_remove_job_users_delete_userapply','2022-05-13 16:43:21.846383'),(25,'jobs','0006_cvonline_company','2022-05-13 16:43:21.908083'),(26,'oauth2_provider','0001_initial','2022-05-13 16:43:22.605550'),(27,'oauth2_provider','0002_auto_20190406_1805','2022-05-13 16:43:22.701294'),(28,'oauth2_provider','0003_auto_20201211_1314','2022-05-13 16:43:22.760138'),(29,'oauth2_provider','0004_auto_20200902_2022','2022-05-13 16:43:23.124257'),(30,'oauth2_provider','0005_auto_20211222_2352','2022-05-13 16:43:23.220510'),(31,'sessions','0001_initial','2022-05-13 16:43:23.259771'),(32,'sites','0001_initial','2022-05-13 16:43:23.275727'),(33,'sites','0002_alter_domain_unique','2022-05-13 16:43:23.332636'),(34,'socialaccount','0001_initial','2022-05-13 16:43:23.729860'),(35,'socialaccount','0002_token_max_lengths','2022-05-13 16:43:23.788655'),(36,'socialaccount','0003_extra_data_default_dict','2022-05-13 16:43:23.805645');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('xbcli8m5sy7kt9myfyi4u11unbn9z75k','.eJxVjEEOwiAQRe_C2hBAoODSfc9AZphBqoYmpV0Z765NutDtf-_9l0iwrTVtnZc0kbgILU6_G0J-cNsB3aHdZpnnti4Tyl2RB-1ynImf18P9O6jQ67cOmiNbZgxkqPjBDRGM4hKDQog-oimGzuDAAmJW2Qd0NiPZHDSGYsX7AwaZOPw:1npYOp:dbJbNUTfJxhDI-R8hu9czK3sh9mSC7InnlNdDo_twIE','2022-05-27 16:44:19.401837');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_site`
--

DROP TABLE IF EXISTS `django_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_site` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_site`
--

LOCK TABLES `django_site` WRITE;
/*!40000 ALTER TABLE `django_site` DISABLE KEYS */;
INSERT INTO `django_site` VALUES (1,'example.com','example.com');
/*!40000 ALTER TABLE `django_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_action`
--

DROP TABLE IF EXISTS `jobs_action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_action` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `type` smallint unsigned NOT NULL,
  `company_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_action_company_id_ca3eea0d_fk_jobs_company_id` (`company_id`),
  KEY `jobs_action_user_id_59c7091e_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `jobs_action_company_id_ca3eea0d_fk_jobs_company_id` FOREIGN KEY (`company_id`) REFERENCES `jobs_company` (`id`),
  CONSTRAINT `jobs_action_user_id_59c7091e_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`),
  CONSTRAINT `jobs_action_chk_1` CHECK ((`type` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_action`
--

LOCK TABLES `jobs_action` WRITE;
/*!40000 ALTER TABLE `jobs_action` DISABLE KEYS */;
INSERT INTO `jobs_action` VALUES (1,'2022-05-13 17:03:53.759241','2022-05-13 17:03:53.759241',0,1,3);
/*!40000 ALTER TABLE `jobs_action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_category`
--

DROP TABLE IF EXISTS `jobs_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_category`
--

LOCK TABLES `jobs_category` WRITE;
/*!40000 ALTER TABLE `jobs_category` DISABLE KEYS */;
INSERT INTO `jobs_category` VALUES (1,1,'2022-05-13 16:44:31.310435','2022-05-13 16:44:31.310435','Công nghệ thông tin'),(2,1,'2022-05-13 16:44:39.277556','2022-05-13 16:44:39.277556','Marketing'),(3,1,'2022-05-13 16:44:44.748495','2022-05-13 16:44:44.748495','Kinh tế');
/*!40000 ALTER TABLE `jobs_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_comment`
--

DROP TABLE IF EXISTS `jobs_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_comment_job_id_b2fdcffa_fk_jobs_job_id` (`job_id`),
  KEY `jobs_comment_user_id_d0b0a06b_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `jobs_comment_job_id_b2fdcffa_fk_jobs_job_id` FOREIGN KEY (`job_id`) REFERENCES `jobs_job` (`id`),
  CONSTRAINT `jobs_comment_user_id_d0b0a06b_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_comment`
--

LOCK TABLES `jobs_comment` WRITE;
/*!40000 ALTER TABLE `jobs_comment` DISABLE KEYS */;
INSERT INTO `jobs_comment` VALUES (1,1,'2022-05-13 17:09:26.187114','2022-05-13 17:09:26.187114','Lua dao!',1,3),(2,1,'2022-05-13 17:12:29.945316','2022-05-13 17:12:29.945316','Do bien thai!',1,2);
/*!40000 ALTER TABLE `jobs_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_company`
--

DROP TABLE IF EXISTS `jobs_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_company` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `jobs_company_user_id_665e3586_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_company`
--

LOCK TABLES `jobs_company` WRITE;
/*!40000 ALTER TABLE `jobs_company` DISABLE KEYS */;
INSERT INTO `jobs_company` VALUES (1,'Viettel',1,'TP. HCM',2);
/*!40000 ALTER TABLE `jobs_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_companyview`
--

DROP TABLE IF EXISTS `jobs_companyview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_companyview` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `views` int NOT NULL,
  `company_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jobs_companyview_company_id_44732293_uniq` (`company_id`),
  CONSTRAINT `jobs_companyview_company_id_44732293_fk_jobs_company_id` FOREIGN KEY (`company_id`) REFERENCES `jobs_company` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_companyview`
--

LOCK TABLES `jobs_companyview` WRITE;
/*!40000 ALTER TABLE `jobs_companyview` DISABLE KEYS */;
INSERT INTO `jobs_companyview` VALUES (1,'2022-05-13 17:15:53.666016','2022-05-13 17:15:53.692202',1,1);
/*!40000 ALTER TABLE `jobs_companyview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_cvonline`
--

DROP TABLE IF EXISTS `jobs_cvonline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_cvonline` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `cv` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id_id` bigint DEFAULT NULL,
  `company_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_id` (`user_id_id`),
  KEY `jobs_cvonline_company_id_55043e3a_fk_jobs_company_id` (`company_id`),
  CONSTRAINT `jobs_cvonline_company_id_55043e3a_fk_jobs_company_id` FOREIGN KEY (`company_id`) REFERENCES `jobs_company` (`id`),
  CONSTRAINT `jobs_cvonline_user_id_id_5e10388e_fk_jobs_user_id` FOREIGN KEY (`user_id_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_cvonline`
--

LOCK TABLES `jobs_cvonline` WRITE;
/*!40000 ALTER TABLE `jobs_cvonline` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs_cvonline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_job`
--

DROP TABLE IF EXISTS `jobs_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_job` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `job_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `company_id` bigint DEFAULT NULL,
  `job_category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_job_category_id_fd8331ed_fk_jobs_category_id` (`category_id`),
  KEY `jobs_job_company_id_1f42ea7c_fk_jobs_company_id` (`company_id`),
  KEY `jobs_job_job_category_id_a260c297_fk_jobs_jobcategory_id` (`job_category_id`),
  CONSTRAINT `jobs_job_category_id_fd8331ed_fk_jobs_category_id` FOREIGN KEY (`category_id`) REFERENCES `jobs_category` (`id`),
  CONSTRAINT `jobs_job_company_id_1f42ea7c_fk_jobs_company_id` FOREIGN KEY (`company_id`) REFERENCES `jobs_company` (`id`),
  CONSTRAINT `jobs_job_job_category_id_a260c297_fk_jobs_jobcategory_id` FOREIGN KEY (`job_category_id`) REFERENCES `jobs_jobcategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_job`
--

LOCK TABLES `jobs_job` WRITE;
/*!40000 ALTER TABLE `jobs_job` DISABLE KEYS */;
INSERT INTO `jobs_job` VALUES (1,1,'2022-05-13 16:53:58.115413','2022-05-13 16:53:58.115413','Front-end Developer','Kinh nghiệm 200 năm.','','1000$',1,1,1),(2,1,'2022-05-13 16:54:53.745748','2022-05-13 16:54:53.745748','Backend Developer','Fresher','','1200$',1,1,1),(3,1,'2022-05-13 16:55:17.960356','2022-05-13 16:55:17.960356','Tester','Kinh nghiệm 2 năm','','1100$',1,1,2),(4,1,'2022-05-13 16:55:54.435830','2022-05-13 16:55:54.435830','Bán vé số ','Có sức khỏe tốt','','2000$',3,1,1),(5,1,'2022-05-13 16:56:20.307188','2022-05-13 16:56:20.307188','Kế toán','Tính toán hay','','1234$',3,1,1),(6,1,'2022-05-13 16:56:43.642631','2022-05-13 16:56:43.642631','Sale bất động sản','Ngoại hình dễ nhìn','','400$',2,1,2),(7,1,'2022-05-13 16:57:04.632051','2022-05-13 16:57:04.633037','Bảo vệ','Đẹp trai','','300$',3,1,2),(8,1,'2022-05-13 16:57:21.921234','2022-05-13 16:57:21.921234','Kế toán trưởng','Giỏi','','3040$',3,1,1);
/*!40000 ALTER TABLE `jobs_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_jobcategory`
--

DROP TABLE IF EXISTS `jobs_jobcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_jobcategory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_jobcategory`
--

LOCK TABLES `jobs_jobcategory` WRITE;
/*!40000 ALTER TABLE `jobs_jobcategory` DISABLE KEYS */;
INSERT INTO `jobs_jobcategory` VALUES (1,'Fulltime'),(2,'Parttime');
/*!40000 ALTER TABLE `jobs_jobcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_rating`
--

DROP TABLE IF EXISTS `jobs_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_rating` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) NOT NULL,
  `updated_date` datetime(6) NOT NULL,
  `rate` smallint unsigned NOT NULL,
  `company_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_rating_company_id_676b286c_fk_jobs_company_id` (`company_id`),
  KEY `jobs_rating_user_id_0db8e088_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `jobs_rating_company_id_676b286c_fk_jobs_company_id` FOREIGN KEY (`company_id`) REFERENCES `jobs_company` (`id`),
  CONSTRAINT `jobs_rating_user_id_0db8e088_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`),
  CONSTRAINT `jobs_rating_chk_1` CHECK ((`rate` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_rating`
--

LOCK TABLES `jobs_rating` WRITE;
/*!40000 ALTER TABLE `jobs_rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_user`
--

DROP TABLE IF EXISTS `jobs_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `avatar` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_user`
--

LOCK TABLES `jobs_user` WRITE;
/*!40000 ALTER TABLE `jobs_user` DISABLE KEYS */;
INSERT INTO `jobs_user` VALUES (1,'pbkdf2_sha256$320000$roHJChB0zWCt6d9hQmqoYk$GKMRt+N4djkZsh8khz5ugLiubeBU0RCl0YjwTuJw3vY=','2022-05-13 16:44:19.000000',1,'admin','Doctor','Strange','admin@gmail.com',1,1,'2022-05-13 16:43:44.000000','users/2022/05/admin-avatar.png',3),(2,'pbkdf2_sha256$320000$yLThnlZ1LOmkgDybpwKplO$bEH4K8EFAkBsK508uElZd33I69V9aKsd5gh5jaHTBaQ=',NULL,0,'locdeptrai','Loc','Vuong','loc@gmail.com',0,1,'2022-05-13 16:46:09.634820','users/2022/05/male-avatar.png',2),(3,'pbkdf2_sha256$320000$z6BZ4oUlhhcBoJaeYRGjaY$1OeBpn6h3HrDT+JWbbeWDUInX5z2pJebJMOug9Fuj8w=',NULL,0,'huynh','Huynh','Tran','huynh@gmail.com',0,1,'2022-05-13 17:00:03.728122','users/2022/05/female-avatar.png',1);
/*!40000 ALTER TABLE `jobs_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_user_groups`
--

DROP TABLE IF EXISTS `jobs_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jobs_user_groups_user_id_group_id_39db2e61_uniq` (`user_id`,`group_id`),
  KEY `jobs_user_groups_group_id_8c4ec9ac_fk_auth_group_id` (`group_id`),
  CONSTRAINT `jobs_user_groups_group_id_8c4ec9ac_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `jobs_user_groups_user_id_c74ea82a_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_user_groups`
--

LOCK TABLES `jobs_user_groups` WRITE;
/*!40000 ALTER TABLE `jobs_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_user_user_permissions`
--

DROP TABLE IF EXISTS `jobs_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jobs_user_user_permissions_user_id_permission_id_80875a4d_uniq` (`user_id`,`permission_id`),
  KEY `jobs_user_user_permi_permission_id_e171478b_fk_auth_perm` (`permission_id`),
  CONSTRAINT `jobs_user_user_permi_permission_id_e171478b_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `jobs_user_user_permissions_user_id_d7a33063_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_user_user_permissions`
--

LOCK TABLES `jobs_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `jobs_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_accesstoken`
--

DROP TABLE IF EXISTS `oauth2_provider_accesstoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_accesstoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `source_refresh_token_id` bigint DEFAULT NULL,
  `id_token_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `source_refresh_token_id` (`source_refresh_token_id`),
  UNIQUE KEY `id_token_id` (`id_token_id`),
  KEY `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_accesstoken_user_id_6e4c9a65_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_acce_application_id_b22886e1_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_acce_id_token_id_85db651b_fk_oauth2_pr` FOREIGN KEY (`id_token_id`) REFERENCES `oauth2_provider_idtoken` (`id`),
  CONSTRAINT `oauth2_provider_acce_source_refresh_token_e66fbc72_fk_oauth2_pr` FOREIGN KEY (`source_refresh_token_id`) REFERENCES `oauth2_provider_refreshtoken` (`id`),
  CONSTRAINT `oauth2_provider_accesstoken_user_id_6e4c9a65_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_accesstoken`
--

LOCK TABLES `oauth2_provider_accesstoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_accesstoken` VALUES (1,'hL4ezUldLvGsAkl5mP74Uq1A9sIzoY','2022-05-14 02:45:33.677726','read write',1,1,'2022-05-13 16:45:33.678724','2022-05-13 16:45:33.678724',NULL,NULL),(2,'vazf46kJqKQgdYYoTDjVBYKtBVKbA9','2022-05-14 02:46:20.349597','read write',1,2,'2022-05-13 16:46:20.350627','2022-05-13 16:46:20.350627',NULL,NULL),(3,'S9SRQchSVBXwWWaovQzrX27IIdr6Rc','2022-05-14 02:47:09.913279','read write',1,1,'2022-05-13 16:47:09.914276','2022-05-13 16:47:09.914276',NULL,NULL),(4,'gNpU35mftRaw7oHJE7oT31kbIwC9kW','2022-05-14 02:47:35.864103','read write',1,2,'2022-05-13 16:47:35.864103','2022-05-13 16:47:35.864103',NULL,NULL),(5,'WOJzakiZzTCso8ppgd2tcH3NaGG462','2022-05-14 02:48:31.444259','read write',1,1,'2022-05-13 16:48:31.444259','2022-05-13 16:48:31.444259',NULL,NULL),(6,'t8twU69fGjWWEDQ26YImUeImGEmg5Q','2022-05-14 02:48:47.354322','read write',1,2,'2022-05-13 16:48:47.354322','2022-05-13 16:48:47.354322',NULL,NULL),(7,'sT8jczXxsBQJtFNM1ynPLasnAg7j2K','2022-05-14 02:49:04.769416','read write',1,1,'2022-05-13 16:49:04.769416','2022-05-13 16:49:04.769416',NULL,NULL),(8,'J4G21olSK1JtIMzgfKf8dLSUDnw1iV','2022-05-14 02:49:24.510965','read write',1,2,'2022-05-13 16:49:24.511965','2022-05-13 16:49:24.511965',NULL,NULL),(9,'a4WRKZzgfwgZmvnOCrfiFbq3UV35vE','2022-05-14 02:53:27.497123','read write',1,2,'2022-05-13 16:53:27.497123','2022-05-13 16:53:27.497123',NULL,NULL),(10,'WiFmVeQUXakvTTVEPSPBn2oYhoXoEb','2022-05-14 02:54:18.255945','read write',1,2,'2022-05-13 16:54:18.256943','2022-05-13 16:54:18.256943',NULL,NULL),(11,'2Zwzj6PtblcYzjum8agj0QUHHA4F3i','2022-05-14 03:02:52.081666','read write',1,3,'2022-05-13 17:02:52.082664','2022-05-13 17:02:52.082664',NULL,NULL),(12,'Hs4w4N0y5kZKdPgtiQMDfj84CsznbS','2022-05-14 03:12:10.912569','read write',1,2,'2022-05-13 17:12:10.912569','2022-05-13 17:12:10.912569',NULL,NULL),(13,'4F9KxCQVcLTaOJohNV0kkGlDR7XuRa','2022-05-14 03:39:07.610282','read write',1,3,'2022-05-13 17:39:07.610282','2022-05-13 17:39:07.610282',NULL,NULL),(14,'F3BJ59XUbgCJEBfi6co5hSiE6EZofS','2022-05-14 03:39:21.562423','read write',1,2,'2022-05-13 17:39:21.562423','2022-05-13 17:39:21.562423',NULL,NULL);
/*!40000 ALTER TABLE `oauth2_provider_accesstoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_application`
--

DROP TABLE IF EXISTS `oauth2_provider_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_application` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `client_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect_uris` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorization_grant_type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_secret` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `skip_authorization` tinyint(1) NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `algorithm` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `client_id` (`client_id`),
  KEY `oauth2_provider_application_user_id_79829054_fk_jobs_user_id` (`user_id`),
  KEY `oauth2_provider_application_client_secret_53133678` (`client_secret`),
  CONSTRAINT `oauth2_provider_application_user_id_79829054_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_application`
--

LOCK TABLES `oauth2_provider_application` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_application` DISABLE KEYS */;
INSERT INTO `oauth2_provider_application` VALUES (1,'DkdIA3qKS6WRdra9ogyKeYeTN8zUdxlZDC6RpaN0','','confidential','password','JME3QNtmF7FaHhL5fP68natkrnsONaJ1xl7yLZhPu7a1RVLDrovzud530CQxqs6UphWUBU9gIKrgKrHayODkZBWnfXQXsgnskU7p01B5kP4Y744VkMGEza9Kb0rBXHNq','OU Job',1,0,'2022-05-13 16:44:55.587513','2022-05-13 16:44:55.587513','');
/*!40000 ALTER TABLE `oauth2_provider_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_grant`
--

DROP TABLE IF EXISTS `oauth2_provider_grant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_grant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `redirect_uri` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `code_challenge` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_challenge_method` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nonce` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `claims` longtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (_utf8mb3''),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_grant_user_id_e8f62af8_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_gran_application_id_81923564_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_grant_user_id_e8f62af8_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_grant`
--

LOCK TABLES `oauth2_provider_grant` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_grant` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_grant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_idtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_idtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_idtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `jti` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(6) NOT NULL,
  `scope` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `application_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jti` (`jti`),
  KEY `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_idtoken_user_id_dd512b59_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_idto_application_id_08c5ff4f_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_idtoken_user_id_dd512b59_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_idtoken`
--

LOCK TABLES `oauth2_provider_idtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth2_provider_idtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth2_provider_refreshtoken`
--

DROP TABLE IF EXISTS `oauth2_provider_refreshtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth2_provider_refreshtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` bigint DEFAULT NULL,
  `application_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) NOT NULL,
  `revoked` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_token_id` (`access_token_id`),
  UNIQUE KEY `oauth2_provider_refreshtoken_token_revoked_af8a5134_uniq` (`token`,`revoked`),
  KEY `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` (`application_id`),
  KEY `oauth2_provider_refreshtoken_user_id_da837fce_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `oauth2_provider_refr_access_token_id_775e84e8_fk_oauth2_pr` FOREIGN KEY (`access_token_id`) REFERENCES `oauth2_provider_accesstoken` (`id`),
  CONSTRAINT `oauth2_provider_refr_application_id_2d1c311b_fk_oauth2_pr` FOREIGN KEY (`application_id`) REFERENCES `oauth2_provider_application` (`id`),
  CONSTRAINT `oauth2_provider_refreshtoken_user_id_da837fce_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth2_provider_refreshtoken`
--

LOCK TABLES `oauth2_provider_refreshtoken` WRITE;
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` DISABLE KEYS */;
INSERT INTO `oauth2_provider_refreshtoken` VALUES (1,'eU8bJH4Jktr74hj7o8JZrox33xqNzT',1,1,1,'2022-05-13 16:45:33.702659','2022-05-13 16:45:33.702659',NULL),(2,'O91TgTKrXXMpP8gMJo9tkic7a748om',2,1,2,'2022-05-13 16:46:20.369543','2022-05-13 16:46:20.369543',NULL),(3,'Ek2JZF6QwLD9JjYXyqbbFZOmBGywvx',3,1,1,'2022-05-13 16:47:09.933225','2022-05-13 16:47:09.933225',NULL),(4,'ZHF5aufph0zOD3vWW49iE22rY4kQPx',4,1,2,'2022-05-13 16:47:35.883045','2022-05-13 16:47:35.883045',NULL),(5,'c3SECY2OUsuVZATcB3R8z7nmhr0I6q',5,1,1,'2022-05-13 16:48:31.463205','2022-05-13 16:48:31.463205',NULL),(6,'Pdswc388XLptS3quAre6YFsrzXkppg',6,1,2,'2022-05-13 16:48:47.374301','2022-05-13 16:48:47.374301',NULL),(7,'1CWKVjuWIVZ1mnqVLX5tQuCRgqEtXi',7,1,1,'2022-05-13 16:49:04.789361','2022-05-13 16:49:04.789361',NULL),(8,'z9Be2wtZM5Rtlcqy0PubW7sQoWtKmw',8,1,2,'2022-05-13 16:49:24.531939','2022-05-13 16:49:24.531939',NULL),(9,'oSjIr6aX24pworGJE5hOJ56QqmJI2C',9,1,2,'2022-05-13 16:53:27.524082','2022-05-13 16:53:27.524082',NULL),(10,'pgWF86q0gUnJGfQYu0nIvz8yWx2Iwb',10,1,2,'2022-05-13 16:54:18.274895','2022-05-13 16:54:18.274895',NULL),(11,'tcWQ6oHaWOC805veZjA0b1RaSalmgK',11,1,3,'2022-05-13 17:02:52.125550','2022-05-13 17:02:52.125550',NULL),(12,'siWWHBhtoN8w8fkkmqoQWS88zwzMAs',12,1,2,'2022-05-13 17:12:10.934509','2022-05-13 17:12:10.934509',NULL),(13,'APry35dRXlqOdz2j6EP7tt7xhSLsAb',13,1,3,'2022-05-13 17:39:07.641525','2022-05-13 17:39:07.641525',NULL),(14,'3SGQBdMXtsjLNT28xROrbMsaVlcPIk',14,1,2,'2022-05-13 17:39:21.593630','2022-05-13 17:39:21.593630',NULL);
/*!40000 ALTER TABLE `oauth2_provider_refreshtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialaccount`
--

DROP TABLE IF EXISTS `socialaccount_socialaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialaccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `extra_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialaccount_provider_uid_fc810c6e_uniq` (`provider`,`uid`),
  KEY `socialaccount_socialaccount_user_id_8146e70c_fk_jobs_user_id` (`user_id`),
  CONSTRAINT `socialaccount_socialaccount_user_id_8146e70c_fk_jobs_user_id` FOREIGN KEY (`user_id`) REFERENCES `jobs_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialaccount`
--

LOCK TABLES `socialaccount_socialaccount` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp`
--

DROP TABLE IF EXISTS `socialaccount_socialapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp`
--

LOCK TABLES `socialaccount_socialapp` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialapp_sites`
--

DROP TABLE IF EXISTS `socialaccount_socialapp_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialapp_sites` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `socialapp_id` int NOT NULL,
  `site_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialapp_sites_socialapp_id_site_id_71a9a768_uniq` (`socialapp_id`,`site_id`),
  KEY `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` (`site_id`),
  CONSTRAINT `socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc` FOREIGN KEY (`socialapp_id`) REFERENCES `socialaccount_socialapp` (`id`),
  CONSTRAINT `socialaccount_socialapp_sites_site_id_2579dee5_fk_django_site_id` FOREIGN KEY (`site_id`) REFERENCES `django_site` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialapp_sites`
--

LOCK TABLES `socialaccount_socialapp_sites` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialapp_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialaccount_socialtoken`
--

DROP TABLE IF EXISTS `socialaccount_socialtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socialaccount_socialtoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_secret` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `account_id` int NOT NULL,
  `app_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq` (`app_id`,`account_id`),
  KEY `socialaccount_social_account_id_951f210e_fk_socialacc` (`account_id`),
  CONSTRAINT `socialaccount_social_account_id_951f210e_fk_socialacc` FOREIGN KEY (`account_id`) REFERENCES `socialaccount_socialaccount` (`id`),
  CONSTRAINT `socialaccount_social_app_id_636a42d7_fk_socialacc` FOREIGN KEY (`app_id`) REFERENCES `socialaccount_socialapp` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialaccount_socialtoken`
--

LOCK TABLES `socialaccount_socialtoken` WRITE;
/*!40000 ALTER TABLE `socialaccount_socialtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `socialaccount_socialtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-14  9:31:41
