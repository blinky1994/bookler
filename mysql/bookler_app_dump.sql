-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: bookler-app
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=273 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings_timeslots`
--

DROP TABLE IF EXISTS `bookings_timeslots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings_timeslots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `timeslot_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=883 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings_timeslots`
--

LOCK TABLES `bookings_timeslots` WRITE;
/*!40000 ALTER TABLE `bookings_timeslots` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings_timeslots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Basketball Courts'),(4,'Gyms'),(3,'Running Tracks'),(6,'Soccer Fields'),(5,'Swimming Pools'),(2,'Tennis Courts');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) DEFAULT NULL,
  `description` longtext,
  `category_id` int DEFAULT NULL,
  `image_url` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities`
--

LOCK TABLES `facilities` WRITE;
/*!40000 ALTER TABLE `facilities` DISABLE KEYS */;
INSERT INTO `facilities` VALUES (22,'Basketball Court 1','Our full-sized outdoor basketball court is the perfect spot for pickup games with friends. With space for up to 10 players, you can enjoy a fast-paced, competitive game on our regulation-sized court. The court is surrounded by a high fence, ensuring privacy and safety for all players. Come shoot some hoops and enjoy the fresh air!',1,'https://images.pexels.com/photos/2891884/pexels-photo-2891884.jpeg?cs=srgb&dl=pexels-tom-jackson-2891884.jpg&fm=jpg'),(23,'Basketball Court 2','Looking for a place to practice your jump shot? Our half-sized indoor basketball court is just what you need! With a high ceiling and ample space, you can hone your skills without worrying about the weather outside. The court is equipped with adjustable hoops, so you can customize the height to fit your skill level. Plus, with a viewing area and a sound system, you can invite your friends and family to watch and cheer you on!',1,'https://images.pexels.com/photos/2891884/pexels-photo-2891884.jpeg?cs=srgb&dl=pexels-tom-jackson-2891884.jpg&fm=jpg'),(24,'Basketball Court 3','Experience the thrill of playing on our full-sized indoor basketball court! With a sleek design and a high-tech scoreboard, you\'ll feel like a pro as you shoot and score. Our court features a rubberized floor that provides excellent grip and reduces the risk of injury. Plus, with adjustable lighting and temperature controls, you can customize the ambiance to suit your preferences. Come check out the best indoor court in town!',1,'https://images.pexels.com/photos/2891884/pexels-photo-2891884.jpeg?cs=srgb&dl=pexels-tom-jackson-2891884.jpg&fm=jpg'),(25,'Basketball Court 4','Play basketball like a pro, day or night, on our outdoor court with lights! With state-of-the-art lighting fixtures, you\'ll never have to worry about running out of daylight. Our court is made of durable, slip-resistant material, ensuring a safe and enjoyable experience for players of all ages and skill levels. Plus, with nearby parking and restrooms, you can stay and play for as long as you want!',1,'https://images.pexels.com/photos/2891884/pexels-photo-2891884.jpeg?cs=srgb&dl=pexels-tom-jackson-2891884.jpg&fm=jpg'),(26,'Basketball Court 5','Our indoor basketball court with bleacher seating is the perfect place for team practices, games, and tournaments. With ample space for up to 20 players, you can train and compete in a comfortable, climate-controlled environment. The court is equipped with adjustable hoops and high-quality basketballs, so you can practice all your favorite moves. Plus, with comfortable seating for spectators, you can invite your fans and family to watch and cheer you on!',1,'https://images.pexels.com/photos/2891884/pexels-photo-2891884.jpeg?cs=srgb&dl=pexels-tom-jackson-2891884.jpg&fm=jpg'),(27,'Fitness Center','Get in shape with our state-of-the-art fitness center! With a variety of cardio and weight machines, you can target all your muscle groups and burn calories in no time. Our center also features a spacious stretching area, a yoga room, and personal trainers who can help you reach your fitness goals. Plus, with locker rooms and showers on-site, you can freshen up after your workout and get on with your day!',4,'https://www.mensjournal.com/.image/t_share/MTk2MTM3MjM3NDk1NjIxMTI1/bxr-london-england.jpg'),(28,'Boxing Gym','Are you ready to train like a pro? Our boxing gym is fully equipped with punching bags, speed bags, and other equipment to help you improve your technique and stamina. With experienced coaches and sparring partners, you can learn new skills and push your limits. Plus, with a ring and an audience seating area, you can showcase your talents and entertain your fans!',4,'https://www.mensjournal.com/.image/t_share/MTk2MTM3MjM3NDk1NjIxMTI1/bxr-london-england.jpg'),(29,'Indoor Climbing Wall','Looking for a new challenge? Try our indoor climbing wall! With a variety of routes and difficulty levels, you can test your strength, agility, and problem-solving skills. Our wall features realistic textures and holds, as well as safety equipment such as ropes and harnesses. Plus, with music and refreshments available, you can enjoy a fun and social atmosphere as you climb!',4,'https://www.mensjournal.com/.image/t_share/MTk2MTM3MjM3NDk1NjIxMTI1/bxr-london-england.jpg'),(30,'Basketball Gym','Shoot some hoops and break a sweat in our basketball gym! With several full-sized courts, you can practice your layups, free throws, and three-pointers to your heart\'s content. Our gym also features adjustable hoops, scoreboards, and lighting, as well as a viewing area for spectators. Whether you\'re playing a pickup game or training for a tournament, you\'ll love our spacious and well-equipped basketball gym!',4,'https://www.mensjournal.com/.image/t_share/MTk2MTM3MjM3NDk1NjIxMTI1/bxr-london-england.jpg'),(31,'Martial Arts Studio','Join our martial arts community and learn self-defense, discipline, and respect! Our studio offers classes in various styles, such as karate, taekwondo, and jiu-jitsu, for all ages and levels. Our instructors are experienced and friendly, and our studio is equipped with mats, bags, and other equipment for safe and effective training. Plus, with social events and belt promotions, you can bond with your fellow students and celebrate your progress!',4,'https://www.mensjournal.com/.image/t_share/MTk2MTM3MjM3NDk1NjIxMTI1/bxr-london-england.jpg'),(32,'Indoor Track','Get your daily dose of cardio without worrying about the weather in our indoor track! With a cushioned surface and gentle curves, you can run or walk comfortably and safely. Our track features lane markings, distance markers, and timing equipment, so you can track your progress and challenge yourself. Plus, with music and TVs available, you can stay entertained and motivated as you exercise!',3,'https://s7d2.scene7.com/is/image/TWCNews/072621_nyc_armorytrackolympiansrogercreditiv3840x2160'),(33,'Outdoor Track','Enjoy the fresh air and the scenery as you run or walk on our outdoor track! With multiple lanes and a variety of surfaces, you can switch up your routine and challenge your muscles. Our track is surrounded by a fence and is well-lit for your safety and convenience. Plus, with water fountains and benches available, you can hydrate and rest as needed!',3,'https://s7d2.scene7.com/is/image/TWCNews/072621_nyc_armorytrackolympiansrogercreditiv3840x2160'),(34,'Stadium Track','Feel like an Olympian as you race on our stadium track! With a full 400-meter oval, a steeplechase pit, and jumping and throwing areas, you can practice all your track and field events. Our track is made of synthetic material and is equipped with professional-grade timing and measurement tools. Plus, with a grandstand and a podium available, you can impress your fans and celebrate your victories',3,'https://s7d2.scene7.com/is/image/TWCNews/072621_nyc_armorytrackolympiansrogercreditiv3840x2160'),(35,'Treadmill Room','Don\'t let bad weather or busy schedules stop you from getting your cardio in! Our treadmill room is open 24/7 and is equipped with top-of-the-line treadmills. With various speeds, inclines, and programs, you can customize your workout to your fitness level and goals. Our room also features TVs, music, and air conditioning for your comfort and entertainment. Plus, with towel service and water dispensers available, you can refresh yourself after your run!',3,'https://s7d2.scene7.com/is/image/TWCNews/072621_nyc_armorytrackolympiansrogercreditiv3840x2160'),(36,'Trail System','Explore the great outdoors and challenge your body on our trail system! With several trails of different lengths and terrains, you can hike, jog, or bike to your heart\'s content. Our trails are surrounded by natural scenery and wildlife, and are marked with signs and maps for your safety and convenience. Plus, with benches and picnic areas available, you can take a break and enjoy the view!',3,'https://s7d2.scene7.com/is/image/TWCNews/072621_nyc_armorytrackolympiansrogercreditiv3840x2160'),(42,'Indoor Soccer Arena','Experience the excitement of soccer without worrying about the weather or the time of day in our indoor soccer arena! With a synthetic turf and regulation-sized dimensions, you can play or watch soccer games year-round. Our arena also features seating areas, scoreboards, and lighting, as well as locker rooms and showers. Whether you\'re a beginner or a pro, you\'ll love the energy and camaraderie of our soccer community!',6,'https://pbs.twimg.com/media/EiDhRVPWsAESyvJ?format=jpg&name=4096x4096'),(43,'Outdoor Soccer Field','Breathe in the fresh air and feel the sun on your skin as you play soccer on our outdoor field! With natural grass and well-maintained surfaces, you can enjoy a challenging and fun game. Our field is marked with white lines and corner flags, and is surrounded by a fence for your safety and convenience. Plus, with bleachers and restrooms available, you can bring your family and friends and make a day of it!',6,'https://pbs.twimg.com/media/EiDhRVPWsAESyvJ?format=jpg&name=4096x4096'),(44,'Futsal Court','Join the fast-paced and skillful world of futsal in our court! With a hard surface and smaller dimensions than regular soccer, futsal requires quick reflexes, ball control, and teamwork. Our court is surrounded by walls and netting, so the ball never goes out of bounds. Our court also features lighting and sound systems, as well as a snack bar and a lounge area. Whether you\'re playing or spectating, you\'ll love the intensity and dynamics of futsal!',6,'https://pbs.twimg.com/media/EiDhRVPWsAESyvJ?format=jpg&name=4096x4096'),(45,'Practice Field','Perfect your technique and tactics on our practice field! With a smaller size and different configurations than a regular soccer field, our practice field allows you to focus on specific skills, such as shooting, passing, and dribbling. Our field is equipped with cones, goals, and other training tools, as well as coaches and drills. Plus, with shade structures and water stations available, you can train comfortably and safely!',6,'https://pbs.twimg.com/media/EiDhRVPWsAESyvJ?format=jpg&name=4096x4096'),(46,'Beach Soccer Pitch','Feel the sand between your toes and the breeze in your hair as you play beach soccer in our pitch! With a soft and sloping surface and smaller goals, beach soccer requires balance, agility, and creativity. Our pitch is located near the ocean and is surrounded by palm trees and hammocks, for a tropical and relaxing atmosphere. Our pitch also features a bar and grill, as well as beach chairs and umbrellas!',6,'https://pbs.twimg.com/media/EiDhRVPWsAESyvJ?format=jpg&name=4096x4096'),(57,'Olympic-Sized Pool','Dive into our Olympic-sized pool and train like a champion! With 50 meters in length and 10 lanes, our pool meets the standards of international competitions. Our pool is also equipped with starting blocks, touch pads, and backstroke flags, as well as a digital scoreboard and a speaker system. Whether you\'re a professional athlete or a recreational swimmer, you\'ll love the quality and the versatility of our pool!',5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxgkW1UJr1J32ivEaDmntx4v3Nc4nOgdu6GzG2KoHWXfjjhzyCFs3CeJoodBt9cyDM9w&usqp=CAU'),(58,'Family Pool','Make a splash with your loved ones in our family pool! With a shallow end for children and a deep end for adults, our pool accommodates all ages and levels of swimming. Our pool is also heated and has a water slide, a diving board, and water features, such as fountains and jets. Our pool is surrounded by lounge chairs, umbrellas, and tables, as well as a snack bar and changing rooms. Whether you\'re teaching your kids to swim or having a pool party, you\'ll love the fun and the memories of our family pool!',5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxgkW1UJr1J32ivEaDmntx4v3Nc4nOgdu6GzG2KoHWXfjjhzyCFs3CeJoodBt9cyDM9w&usqp=CAU'),(59,'Infinity Pool','Enjoy the breathtaking views and the luxurious feel of our infinity pool! With an edgeless design and a reflective surface, our pool blends seamlessly with the horizon and the sky. Our pool is also heated and has a swim-up bar, underwater speakers, and colored lights. Our pool is surrounded by sun decks, cabanas, and fire pits, as well as a restaurant and a spa. Whether you\'re watching the sunset or stargazing, you\'ll love the tranquility and the indulgence of our infinity pool!',5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxgkW1UJr1J32ivEaDmntx4v3Nc4nOgdu6GzG2KoHWXfjjhzyCFs3CeJoodBt9cyDM9w&usqp=CAU'),(60,'Lap Pool','Get into the rhythm and the zone of your swim in our lap pool! With a rectangular shape and a moderate length, our pool is perfect for practicing your strokes and building your endurance. Our pool is also saltwater and has a temperature control system, as well as underwater cameras and a mirror. Our pool is surrounded by rubber tiles, mirrors, and stretching areas, as well as a physical therapy clinic and a yoga studio!',5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxgkW1UJr1J32ivEaDmntx4v3Nc4nOgdu6GzG2KoHWXfjjhzyCFs3CeJoodBt9cyDM9w&usqp=CAU'),(61,'Thermal Pool','Soothe your muscles and your mind in our thermal pool! With a warm and mineral-rich water, our pool provides therapeutic benefits for your health and wellness. Our pool is also enclosed and has a steam room, a sauna, and a hot tub, as well as a meditation room and a juice bar. Our pool is surrounded by mosaic tiles, pebble stones, and plants, as well as a library and a lounge area. Whether you\'re recovering from stress or seeking inner balance, you\'ll love the serenity and the healing of our thermal pool!',5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJxgkW1UJr1J32ivEaDmntx4v3Nc4nOgdu6GzG2KoHWXfjjhzyCFs3CeJoodBt9cyDM9w&usqp=CAU'),(62,'Championship Court','Step up your game on our championship court! With a high-quality surface and a regulation size, our court offers a professional playing experience. Our court is also lit and has a fence, a net, and a windscreen, as well as a ball machine and a pro shop. Whether you\'re a beginner or a seasoned player, you\'ll love the challenge and the excitement of our championship court!',2,'https://www.yorkcounty.gov/ImageRepository/Document?documentID=43167'),(63,'Family Court','Play with your family and friends on our family court! With a smaller size and a lower net, our court is perfect for casual games and leisurely matches. Our court is also shaded and has a picnic area, a grill, and a playground, as well as a basket of balls and racquets. Whether you\'re hosting a BBQ or having a friendly tournament, you\'ll love the fun and the bonding of our family court!',2,'https://www.yorkcounty.gov/ImageRepository/Document?documentID=43167'),(64,'Clay Court','Experience the tradition and the beauty of clay tennis on our clay court! With a soft and natural surface, our court provides a slower and more challenging game. Our court is also watered and swept, and has a fence, a net, and a chair umpire, as well as a scoreboard and a lounge. Whether you\'re a purist or a clay-curious, you\'ll love the elegance and the artistry of our clay court!',2,'https://www.yorkcounty.gov/ImageRepository/Document?documentID=43167'),(65,'Indoor Court','Escape the weather and play anytime on our indoor court! With a climate-controlled environment and a hard surface, our court offers a comfortable and consistent playing condition. Our court is also equipped with lighting, ventilation, and sound system, as well as a viewing gallery and a bar. Whether you\'re avoiding the rain or beating the heat, you\'ll love the convenience and the versatility of our indoor court!',2,'https://www.yorkcounty.gov/ImageRepository/Document?documentID=43167'),(66,'Rooftop Court','Elevate your game and your view on our rooftop court! With a panoramic and unique location, our court offers a spectacular and inspiring playing backdrop. Our court is also cushioned and has a fence, a net, and a sunshade, as well as a rooftop bar and a DJ booth. Whether you\'re a tourist or a local, you\'ll love the urban and the trendy vibe of our rooftop court!',2,'https://www.yorkcounty.gov/ImageRepository/Document?documentID=43167');
/*!40000 ALTER TABLE `facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslots`
--

DROP TABLE IF EXISTS `timeslots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `facility_id` int NOT NULL,
  `slots` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslots`
--

LOCK TABLES `timeslots` WRITE;
/*!40000 ALTER TABLE `timeslots` DISABLE KEYS */;
INSERT INTO `timeslots` VALUES (10,'2023-05-01 16:00:00','2023-05-01 17:00:00',22,3),(11,'2023-05-01 11:00:00','2023-05-01 12:00:00',22,3),(12,'2023-05-01 14:00:00','2023-05-01 15:00:00',22,3),(13,'2023-05-03 10:00:00','2023-05-03 11:00:00',22,3),(14,'2023-05-03 11:00:00','2023-05-03 12:00:00',22,3),(15,'2023-05-03 14:00:00','2023-05-03 15:00:00',22,3),(16,'2023-05-01 10:00:00','2023-05-01 11:00:00',23,3),(17,'2023-05-01 11:00:00','2023-05-01 12:00:00',23,3),(18,'2023-05-01 14:00:00','2023-05-01 15:00:00',23,3),(19,'2023-05-03 10:00:00','2023-05-03 11:00:00',23,3),(20,'2023-05-03 11:00:00','2023-05-03 12:00:00',23,3),(21,'2023-05-03 14:00:00','2023-05-03 15:00:00',23,3),(22,'2023-05-01 10:00:00','2023-05-01 11:00:00',24,3),(23,'2023-05-01 11:00:00','2023-05-01 12:00:00',24,3),(24,'2023-05-01 14:00:00','2023-05-01 15:00:00',24,3),(25,'2023-05-03 10:00:00','2023-05-03 11:00:00',24,3),(26,'2023-05-03 11:00:00','2023-05-03 12:00:00',24,3),(27,'2023-05-03 14:00:00','2023-05-03 15:00:00',24,3),(28,'2023-05-01 10:00:00','2023-05-01 11:00:00',25,3),(29,'2023-05-01 11:00:00','2023-05-01 12:00:00',25,3),(30,'2023-05-01 14:00:00','2023-05-01 15:00:00',25,3),(31,'2023-05-03 10:00:00','2023-05-03 11:00:00',25,3),(32,'2023-05-03 11:00:00','2023-05-03 12:00:00',25,3),(33,'2023-05-03 14:00:00','2023-05-03 15:00:00',25,3),(34,'2023-05-01 10:00:00','2023-05-01 11:00:00',26,3),(35,'2023-05-01 11:00:00','2023-05-01 12:00:00',26,3),(36,'2023-05-01 14:00:00','2023-05-01 15:00:00',26,3),(37,'2023-05-03 10:00:00','2023-05-03 11:00:00',26,3),(38,'2023-05-03 11:00:00','2023-05-03 12:00:00',26,3),(39,'2023-05-03 14:00:00','2023-05-03 15:00:00',26,3),(40,'2023-05-01 10:00:00','2023-05-01 11:00:00',27,3),(41,'2023-05-01 11:00:00','2023-05-01 12:00:00',27,3),(42,'2023-05-01 14:00:00','2023-05-01 15:00:00',27,3),(43,'2023-05-03 10:00:00','2023-05-03 11:00:00',27,3),(44,'2023-05-03 11:00:00','2023-05-03 12:00:00',27,3),(45,'2023-05-03 14:00:00','2023-05-03 15:00:00',27,3),(46,'2023-05-01 10:00:00','2023-05-01 11:00:00',28,3),(47,'2023-05-01 11:00:00','2023-05-01 12:00:00',28,3),(48,'2023-05-01 14:00:00','2023-05-01 15:00:00',28,3),(49,'2023-05-03 10:00:00','2023-05-03 11:00:00',28,3),(50,'2023-05-03 11:00:00','2023-05-03 12:00:00',28,3),(51,'2023-05-03 14:00:00','2023-05-03 15:00:00',28,3),(52,'2023-05-01 10:00:00','2023-05-01 11:00:00',29,3),(53,'2023-05-01 11:00:00','2023-05-01 12:00:00',29,3),(54,'2023-05-01 14:00:00','2023-05-01 15:00:00',29,3),(55,'2023-05-03 10:00:00','2023-05-03 11:00:00',29,3),(56,'2023-05-03 11:00:00','2023-05-03 12:00:00',29,3),(57,'2023-05-03 14:00:00','2023-05-03 15:00:00',29,3),(58,'2023-05-01 10:00:00','2023-05-01 11:00:00',30,3),(59,'2023-05-01 11:00:00','2023-05-01 12:00:00',30,3),(60,'2023-05-01 14:00:00','2023-05-01 15:00:00',30,3),(61,'2023-05-03 10:00:00','2023-05-03 11:00:00',30,3),(62,'2023-05-03 11:00:00','2023-05-03 12:00:00',30,3),(63,'2023-05-03 14:00:00','2023-05-03 15:00:00',30,3),(64,'2023-05-01 10:00:00','2023-05-01 11:00:00',31,3),(65,'2023-05-01 11:00:00','2023-05-01 12:00:00',31,3),(66,'2023-05-01 14:00:00','2023-05-01 15:00:00',31,3),(67,'2023-05-03 10:00:00','2023-05-03 11:00:00',31,3),(68,'2023-05-03 11:00:00','2023-05-03 12:00:00',31,3),(69,'2023-05-03 14:00:00','2023-05-03 15:00:00',31,3),(70,'2023-05-01 10:00:00','2023-05-01 11:00:00',32,3),(71,'2023-05-01 11:00:00','2023-05-01 12:00:00',32,3),(72,'2023-05-01 14:00:00','2023-05-01 15:00:00',32,3),(73,'2023-05-03 10:00:00','2023-05-03 11:00:00',32,3),(74,'2023-05-03 11:00:00','2023-05-03 12:00:00',32,3),(75,'2023-05-03 14:00:00','2023-05-03 15:00:00',32,3),(76,'2023-05-01 10:00:00','2023-05-01 11:00:00',33,3),(77,'2023-05-01 10:00:00','2023-05-01 11:00:00',34,3),(78,'2023-05-01 10:00:00','2023-05-01 11:00:00',35,3),(79,'2023-05-01 10:00:00','2023-05-01 11:00:00',36,3),(80,'2023-05-01 11:00:00','2023-05-01 12:00:00',33,3),(81,'2023-05-01 11:00:00','2023-05-01 12:00:00',34,3),(82,'2023-05-01 11:00:00','2023-05-01 12:00:00',35,3),(83,'2023-05-01 11:00:00','2023-05-01 12:00:00',36,3),(84,'2023-05-01 14:00:00','2023-05-01 15:00:00',33,3),(85,'2023-05-01 14:00:00','2023-05-01 15:00:00',34,3),(86,'2023-05-01 14:00:00','2023-05-01 15:00:00',35,3),(87,'2023-05-01 14:00:00','2023-05-01 15:00:00',36,3),(88,'2023-05-03 10:00:00','2023-05-03 11:00:00',33,3),(89,'2023-05-03 10:00:00','2023-05-03 11:00:00',34,3),(90,'2023-05-03 10:00:00','2023-05-03 11:00:00',35,3),(91,'2023-05-03 10:00:00','2023-05-03 11:00:00',36,3),(92,'2023-05-03 11:00:00','2023-05-03 12:00:00',33,3),(93,'2023-05-03 11:00:00','2023-05-03 12:00:00',34,3),(94,'2023-05-03 11:00:00','2023-05-03 12:00:00',35,3),(95,'2023-05-03 11:00:00','2023-05-03 12:00:00',36,3),(96,'2023-05-03 14:00:00','2023-05-03 15:00:00',33,3),(97,'2023-05-03 14:00:00','2023-05-03 15:00:00',34,3),(98,'2023-05-03 14:00:00','2023-05-03 15:00:00',35,3),(99,'2023-05-03 14:00:00','2023-05-03 15:00:00',36,3),(107,'2023-05-01 10:00:00','2023-05-01 11:00:00',42,3),(108,'2023-05-01 10:00:00','2023-05-01 11:00:00',43,3),(109,'2023-05-01 10:00:00','2023-05-01 11:00:00',44,3),(110,'2023-05-01 10:00:00','2023-05-01 11:00:00',45,3),(111,'2023-05-01 10:00:00','2023-05-01 11:00:00',46,3),(112,'2023-05-01 11:00:00','2023-05-01 12:00:00',42,3),(113,'2023-05-01 11:00:00','2023-05-01 12:00:00',43,3),(114,'2023-05-01 11:00:00','2023-05-01 12:00:00',44,3),(115,'2023-05-01 11:00:00','2023-05-01 12:00:00',45,3),(116,'2023-05-01 11:00:00','2023-05-01 12:00:00',46,3),(117,'2023-05-01 14:00:00','2023-05-01 15:00:00',42,3),(118,'2023-05-01 14:00:00','2023-05-01 15:00:00',43,3),(119,'2023-05-01 14:00:00','2023-05-01 15:00:00',44,3),(120,'2023-05-01 14:00:00','2023-05-01 15:00:00',45,3),(121,'2023-05-01 14:00:00','2023-05-01 15:00:00',46,3),(122,'2023-05-03 10:00:00','2023-05-03 11:00:00',42,3),(123,'2023-05-03 10:00:00','2023-05-03 11:00:00',43,3),(124,'2023-05-03 10:00:00','2023-05-03 11:00:00',44,3),(125,'2023-05-03 10:00:00','2023-05-03 11:00:00',45,3),(126,'2023-05-03 10:00:00','2023-05-03 11:00:00',46,3),(127,'2023-05-03 11:00:00','2023-05-03 12:00:00',42,3),(128,'2023-05-03 11:00:00','2023-05-03 12:00:00',43,3),(129,'2023-05-03 11:00:00','2023-05-03 12:00:00',44,3),(130,'2023-05-03 11:00:00','2023-05-03 12:00:00',45,3),(131,'2023-05-03 11:00:00','2023-05-03 12:00:00',46,3),(132,'2023-05-03 14:00:00','2023-05-03 15:00:00',42,3),(133,'2023-05-03 14:00:00','2023-05-03 15:00:00',43,3),(134,'2023-05-03 14:00:00','2023-05-03 15:00:00',44,3),(135,'2023-05-03 14:00:00','2023-05-03 15:00:00',45,3),(136,'2023-05-03 14:00:00','2023-05-03 15:00:00',46,3),(138,'2023-05-01 10:00:00','2023-05-01 11:00:00',57,3),(139,'2023-05-01 10:00:00','2023-05-01 11:00:00',58,3),(140,'2023-05-01 10:00:00','2023-05-01 11:00:00',59,3),(141,'2023-05-01 10:00:00','2023-05-01 11:00:00',60,3),(142,'2023-05-01 10:00:00','2023-05-01 11:00:00',61,3),(143,'2023-05-01 10:00:00','2023-05-01 11:00:00',62,3),(144,'2023-05-01 10:00:00','2023-05-01 11:00:00',63,3),(145,'2023-05-01 10:00:00','2023-05-01 11:00:00',64,3),(146,'2023-05-01 10:00:00','2023-05-01 11:00:00',65,3),(147,'2023-05-01 10:00:00','2023-05-01 11:00:00',66,3),(148,'2023-05-01 11:00:00','2023-05-01 12:00:00',57,3),(149,'2023-05-01 11:00:00','2023-05-01 12:00:00',58,3),(150,'2023-05-01 11:00:00','2023-05-01 12:00:00',59,3),(151,'2023-05-01 11:00:00','2023-05-01 12:00:00',60,3),(152,'2023-05-01 11:00:00','2023-05-01 12:00:00',61,3),(153,'2023-05-01 11:00:00','2023-05-01 12:00:00',62,3),(154,'2023-05-01 11:00:00','2023-05-01 12:00:00',63,3),(155,'2023-05-01 11:00:00','2023-05-01 12:00:00',64,3),(156,'2023-05-01 11:00:00','2023-05-01 12:00:00',65,3),(157,'2023-05-01 11:00:00','2023-05-01 12:00:00',66,3),(158,'2023-05-01 14:00:00','2023-05-01 15:00:00',57,3),(159,'2023-05-01 14:00:00','2023-05-01 15:00:00',58,3),(160,'2023-05-01 14:00:00','2023-05-01 15:00:00',59,3),(161,'2023-05-01 14:00:00','2023-05-01 15:00:00',60,3),(162,'2023-05-01 14:00:00','2023-05-01 15:00:00',61,3),(163,'2023-05-01 14:00:00','2023-05-01 15:00:00',62,3),(164,'2023-05-01 14:00:00','2023-05-01 15:00:00',63,3),(165,'2023-05-01 14:00:00','2023-05-01 15:00:00',64,3),(166,'2023-05-01 14:00:00','2023-05-01 15:00:00',65,3),(167,'2023-05-01 14:00:00','2023-05-01 15:00:00',66,3),(168,'2023-05-03 10:00:00','2023-05-03 11:00:00',57,3),(169,'2023-05-03 10:00:00','2023-05-03 11:00:00',58,3),(170,'2023-05-03 10:00:00','2023-05-03 11:00:00',59,3),(171,'2023-05-03 10:00:00','2023-05-03 11:00:00',60,3),(172,'2023-05-03 10:00:00','2023-05-03 11:00:00',61,3),(173,'2023-05-03 10:00:00','2023-05-03 11:00:00',62,3),(174,'2023-05-03 10:00:00','2023-05-03 11:00:00',63,3),(175,'2023-05-03 10:00:00','2023-05-03 11:00:00',64,3),(176,'2023-05-03 10:00:00','2023-05-03 11:00:00',65,3),(177,'2023-05-03 10:00:00','2023-05-03 11:00:00',66,3),(178,'2023-05-03 11:00:00','2023-05-03 12:00:00',57,3),(179,'2023-05-03 11:00:00','2023-05-03 12:00:00',58,3),(180,'2023-05-03 11:00:00','2023-05-03 12:00:00',59,3),(181,'2023-05-03 11:00:00','2023-05-03 12:00:00',60,3),(182,'2023-05-03 11:00:00','2023-05-03 12:00:00',61,3),(183,'2023-05-03 11:00:00','2023-05-03 12:00:00',62,3),(184,'2023-05-03 11:00:00','2023-05-03 12:00:00',63,3),(185,'2023-05-03 11:00:00','2023-05-03 12:00:00',64,3),(186,'2023-05-03 11:00:00','2023-05-03 12:00:00',65,3),(187,'2023-05-03 11:00:00','2023-05-03 12:00:00',66,3),(188,'2023-05-03 14:00:00','2023-05-03 15:00:00',57,3),(189,'2023-05-03 14:00:00','2023-05-03 15:00:00',58,3),(190,'2023-05-03 14:00:00','2023-05-03 15:00:00',59,3),(191,'2023-05-03 14:00:00','2023-05-03 15:00:00',60,3),(192,'2023-05-03 14:00:00','2023-05-03 15:00:00',61,3),(193,'2023-05-03 14:00:00','2023-05-03 15:00:00',62,3),(194,'2023-05-03 14:00:00','2023-05-03 15:00:00',63,3),(195,'2023-05-03 14:00:00','2023-05-03 15:00:00',64,3),(196,'2023-05-03 14:00:00','2023-05-03 15:00:00',65,3),(197,'2023-05-03 14:00:00','2023-05-03 15:00:00',66,3);
/*!40000 ALTER TABLE `timeslots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (80,'ivanchenyifan@hotmail.com','$2b$05$4BCrec2gg0RUhxevbrGYIeR03Hl89s1I9lohqM6rGlPZPJGsdW3be');
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

-- Dump completed on 2023-05-22 18:23:43
