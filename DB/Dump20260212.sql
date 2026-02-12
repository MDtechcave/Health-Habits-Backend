-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: healthy_habits_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `drinks`
--

DROP TABLE IF EXISTS `drinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drinks` (
  `drink_id` int NOT NULL AUTO_INCREMENT,
  `drink_name` varchar(45) NOT NULL,
  `calories` int NOT NULL,
  PRIMARY KEY (`drink_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drinks`
--

LOCK TABLES `drinks` WRITE;
/*!40000 ALTER TABLE `drinks` DISABLE KEYS */;
INSERT INTO `drinks` VALUES (1,'Water',0),(2,'Green Tea',2),(3,'Lemon Water',5),(4,'Fresh Orange Juice',45),(5,'Herbal Tea',0),(6,'Coconut Water',40);
/*!40000 ALTER TABLE `drinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goals` (
  `goal_id` int NOT NULL AUTO_INCREMENT,
  `goal_type` varchar(45) NOT NULL,
  PRIMARY KEY (`goal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goals`
--

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */;
INSERT INTO `goals` VALUES (1,'Weight Loss'),(2,'Muscle Gain'),(3,'Health Maintenance');
/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `ingredient_id` int NOT NULL AUTO_INCREMENT,
  `ingredient_name` varchar(45) NOT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'Eggs'),(2,'Oats'),(3,'Chicken Breast'),(4,'Brown Rice'),(5,'Broccoli'),(6,'Spinach'),(7,'Almonds'),(8,'Salmon'),(9,'Sweet Potato'),(10,'Quinoa'),(11,'Greek Yogurt'),(12,'Berries'),(13,'Avocado'),(14,'Tomatoes'),(15,'Banana'),(16,'Peanut Butter'),(17,'Cottage Cheese'),(18,'Whole Wheat Bread'),(19,'Turkey Breast'),(20,'Lentils'),(21,'Chia Seeds'),(22,'Apple'),(23,'Carrots'),(24,'Hummus'),(25,'Cucumber'),(26,'Bell Peppers'),(27,'Pasta'),(28,'Ground Beef'),(29,'Zucchini'),(30,'Mushrooms');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_drinks`
--

DROP TABLE IF EXISTS `meal_drinks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal_drinks` (
  `meal_id` int NOT NULL AUTO_INCREMENT,
  `drink_id` int NOT NULL,
  PRIMARY KEY (`meal_id`,`drink_id`),
  KEY `drink_id_idx` (`drink_id`),
  CONSTRAINT `drink_id` FOREIGN KEY (`drink_id`) REFERENCES `drinks` (`drink_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_meal` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_drinks`
--

LOCK TABLES `meal_drinks` WRITE;
/*!40000 ALTER TABLE `meal_drinks` DISABLE KEYS */;
INSERT INTO `meal_drinks` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(1,2),(6,2),(7,2),(8,3),(9,3),(2,5),(3,5),(10,5),(4,6),(5,6);
/*!40000 ALTER TABLE `meal_drinks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_ingredient`
--

DROP TABLE IF EXISTS `meal_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal_ingredient` (
  `meal_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  KEY `meal_idx` (`meal_id`),
  KEY `ingredient_idx` (`ingredient_id`),
  CONSTRAINT `ingredient` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `meal` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_ingredient`
--

LOCK TABLES `meal_ingredient` WRITE;
/*!40000 ALTER TABLE `meal_ingredient` DISABLE KEYS */;
INSERT INTO `meal_ingredient` VALUES (1,2),(1,12),(1,7),(2,1),(2,6),(2,14),(3,3),(3,6),(3,13),(3,14),(3,3),(3,6),(3,13),(3,14),(4,10),(4,5),(4,29),(4,26),(5,8),(5,9),(5,5),(6,3),(6,29),(6,6),(7,11),(7,12),(8,15),(8,16),(9,22),(9,7),(10,23),(10,24);
/*!40000 ALTER TABLE `meal_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meals` (
  `meal_id` int NOT NULL AUTO_INCREMENT,
  `goal_id` int NOT NULL,
  `meal_name` varchar(45) NOT NULL,
  `meal_type` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `calories` int NOT NULL,
  `carbs` int NOT NULL,
  `protein` int NOT NULL,
  PRIMARY KEY (`meal_id`),
  KEY `goal_id_idx` (`goal_id`),
  CONSTRAINT `meal_goal_id` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meals`
--

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
INSERT INTO `meals` VALUES (1,1,'Oatmeal with Berries','Breakfast','Oats with fresh berries and almonds',300,45,10),(2,1,'Egg White Omelette','Breakfast','Egg whites with spinach and tomatoes',250,5,20),(3,1,'Grilled Chicken Salad','Lunch','Chicken with mixed greens, avocado, and tomatoes',400,20,35),(4,1,'Quinoa Veggie Bowl','Lunch','Quinoa with broccoli, zucchini, and bell peppers',350,50,15),(5,1,'Baked Salmon with Sweet Potato','Supper','Salmon with roasted sweet potato and broccoli',450,35,40),(6,1,'Chicken Stir-Fry','Supper','Chicken stir-fried with mushrooms and spinach',400,25,35),(7,1,'Greek Yogurt with Berries','Snack','Greek yogurt with berries',150,15,12),(8,1,'Peanut Butter Banana','Snack','Banana with peanut butter',200,25,5),(9,1,'Apple with Almonds','Snack','Apple slices with almonds',180,20,6),(10,1,'Carrot Sticks with Hummus','Snack','Fresh carrots with hummus dip',120,10,5),(11,2,'Protein Oats with Banana','Breakfast','Oats with banana and peanut butter',400,50,20),(12,2,'Scrambled Eggs with Avocado','Breakfast','Eggs scrambled with avocado and tomatoes',350,10,25),(13,2,'Chicken Quinoa Bowl','Lunch','Grilled chicken with quinoa and broccoli',500,40,45),(14,2,'Salmon Pasta','Lunch','Salmon with whole wheat pasta and vegetables',550,60,40),(15,2,'Turkey Sweet Potato','Supper','Roasted turkey breast with sweet potato and spinach',500,35,50),(16,2,'Beef Stir-Fry','Supper','Lean ground beef stir-fried with zucchini and bell peppers',480,30,45),(17,2,'Greek Yogurt with Chia Seeds','Snack','Greek yogurt topped with chia seeds',200,15,20),(18,2,'Peanut Butter Protein Shake','Snack','Banana blended with peanut butter and protein',250,20,20),(19,2,'Cottage Cheese with Berries','Snack','Cottage cheese with fresh berries',180,10,15),(20,2,'Apple with Almonds','Snack','Apple slices with almonds',180,20,6),(21,3,'Oatmeal with Banana','Breakfast','Oats with banana and almonds',320,45,10),(22,3,'Veggie Omelette','Breakfast','Egg omelette with spinach, mushrooms, and tomatoes',300,10,20),(23,3,'Grilled Chicken Quinoa Salad','Lunch','Chicken with quinoa, avocado, and bell peppers',450,40,35),(24,3,'Salmon Brown Rice Bowl','Lunch','Salmon with brown rice and broccoli',500,45,40),(25,3,'Turkey Stir-Fry','Supper','Turkey breast with zucchini and mushrooms',480,35,40),(26,3,'Baked Salmon with Veggies','Supper','Salmon baked with bell peppers and broccoli',450,30,35),(27,3,'Greek Yogurt with Berries','Snack','Greek yogurt with fresh berries',150,15,12),(28,3,'Peanut Butter Banana','Snack','Banana with peanut butter',200,25,5),(29,3,'Apple with Almonds','Snack','Apple slices with almonds',180,20,6),(30,3,'Carrot Sticks with Hummus','Snack','Fresh carrots with hummus',120,10,5);
/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `sub_id` int NOT NULL,
  `order_date` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `order_status` varchar(45) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `sub_id_idx` (`sub_id`),
  CONSTRAINT `sub_id` FOREIGN KEY (`sub_id`) REFERENCES `subscription` (`sub_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_meals`
--

DROP TABLE IF EXISTS `package_meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_meals` (
  `package_id` int NOT NULL,
  `meal_id` int NOT NULL,
  PRIMARY KEY (`package_id`,`meal_id`),
  KEY `id_meals_idx` (`meal_id`),
  CONSTRAINT `id_meals` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`meal_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `id_package` FOREIGN KEY (`package_id`) REFERENCES `weekly_packages` (`package_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_meals`
--

LOCK TABLES `package_meals` WRITE;
/*!40000 ALTER TABLE `package_meals` DISABLE KEYS */;
INSERT INTO `package_meals` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(3,21),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30);
/*!40000 ALTER TABLE `package_meals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `pay_method` varchar(45) NOT NULL,
  `pay_date` date NOT NULL,
  `pay_status` varchar(45) NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `order_id_idx` (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionaire`
--

DROP TABLE IF EXISTS `questionaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionaire` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `goal_id` int NOT NULL,
  `diet_type` varchar(45) NOT NULL,
  `weekly_meals` int NOT NULL,
  `allergens` varchar(45) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `goal_id_idx` (`goal_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `goal_id` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionaire`
--

LOCK TABLES `questionaire` WRITE;
/*!40000 ALTER TABLE `questionaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `questionaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `package_id` int NOT NULL,
  `start_date` date NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`sub_id`),
  KEY `users_idx` (`user_id`),
  KEY `packages_idx` (`package_id`),
  CONSTRAINT `packages` FOREIGN KEY (`package_id`) REFERENCES `weekly_packages` (`package_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sibahle tyantsi','siba@life.com','siba123','01 Adderly Street, Cape Town'),(2,'Asiphe Langa','asiphe@life.com','asiphe456','02 Bree Street, Cape Town'),(3,'Mihle Dudumashe','mihle@life.com','mihle789','03 Long Street, Cape Town'),(4,'Jose Dhlamini','jose@life.com','jose012','04 Kloof Street, Cape Town');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weekly_packages`
--

DROP TABLE IF EXISTS `weekly_packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weekly_packages` (
  `package_id` int NOT NULL AUTO_INCREMENT,
  `goal_id` int NOT NULL,
  `package_name` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_days` int NOT NULL,
  PRIMARY KEY (`package_id`),
  KEY `id_goal_idx` (`goal_id`),
  CONSTRAINT `id_goal` FOREIGN KEY (`goal_id`) REFERENCES `goals` (`goal_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekly_packages`
--

LOCK TABLES `weekly_packages` WRITE;
/*!40000 ALTER TABLE `weekly_packages` DISABLE KEYS */;
INSERT INTO `weekly_packages` VALUES (1,1,'Weight Loss 7-Day Plan',350.00,7),(2,2,'Muscle Gain 7-Day Plan',400.00,7),(3,3,'Healthy Maintenance 7-Day Plan',300.00,7);
/*!40000 ALTER TABLE `weekly_packages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-12 12:01:56
