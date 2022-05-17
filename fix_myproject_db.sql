/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100414
 Source Host           : localhost:3306
 Source Schema         : fix_myproject_db

 Target Server Type    : MySQL
 Target Server Version : 100414
 File Encoding         : 65001

 Date: 18/12/2020 00:39:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbcomment
-- ----------------------------
DROP TABLE IF EXISTS `tbcomment`;
CREATE TABLE `tbcomment`  (
  `id_Comment` int(255) NOT NULL AUTO_INCREMENT,
  `id_Post` int(255) NOT NULL,
  `id_User` int(255) NOT NULL,
  `Content_Comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DateTime_Comment` datetime(0) NOT NULL DEFAULT current_timestamp(0),
  `ParentCode` int(255) NOT NULL,
  PRIMARY KEY (`id_Comment`) USING BTREE,
  INDEX `FK_tbComment_tbPost`(`id_Post`) USING BTREE,
  INDEX `FK_tbComment_tbProfile`(`id_User`) USING BTREE,
  CONSTRAINT `FK_tbComment_tbPost` FOREIGN KEY (`id_Post`) REFERENCES `tbpost` (`id_Post`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_tbComment_tbProfile` FOREIGN KEY (`id_User`) REFERENCES `tbprofile` (`id_User`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbcomment
-- ----------------------------
INSERT INTO `tbcomment` VALUES (11, 165, 2, 'hhhh', '2020-11-13 16:35:52', 0);
INSERT INTO `tbcomment` VALUES (12, 159, 2, 'aalo 123', '2020-12-18 00:26:29', 0);

-- ----------------------------
-- Table structure for tbcontent
-- ----------------------------
DROP TABLE IF EXISTS `tbcontent`;
CREATE TABLE `tbcontent`  (
  `id_Content` int(255) NOT NULL AUTO_INCREMENT,
  `id_Post` int(255) NOT NULL,
  `Title_Content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `Text_Content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `DateTimeContent` datetime(0) NOT NULL DEFAULT current_timestamp(0),
  PRIMARY KEY (`id_Content`) USING BTREE,
  INDEX `FK_tbcontent_tbpost`(`id_Post`) USING BTREE,
  CONSTRAINT `FK_tbcontent_tbpost` FOREIGN KEY (`id_Post`) REFERENCES `tbpost` (`id_Post`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 119 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbcontent
-- ----------------------------
INSERT INTO `tbcontent` VALUES (102, 157, NULL, '123456789', '2020-10-16 10:59:56');
INSERT INTO `tbcontent` VALUES (103, 158, NULL, '6789', '2020-10-16 11:00:18');
INSERT INTO `tbcontent` VALUES (105, 159, NULL, '235u89', '2020-10-16 11:11:23');
INSERT INTO `tbcontent` VALUES (106, 159, ' ', '235u89', '2020-10-16 11:11:45');
INSERT INTO `tbcontent` VALUES (107, 160, NULL, 'tttt', '2020-10-16 11:12:16');
INSERT INTO `tbcontent` VALUES (108, 161, NULL, 'tuankiet', '2020-10-16 11:17:19');
INSERT INTO `tbcontent` VALUES (109, 160, ' ', 'tttt', '2020-10-16 11:17:35');
INSERT INTO `tbcontent` VALUES (110, 161, ' ', 'tuankiet', '2020-10-16 11:18:02');
INSERT INTO `tbcontent` VALUES (114, 164, NULL, 'fffffff', '2020-11-13 16:32:00');
INSERT INTO `tbcontent` VALUES (115, 164, ' ', 'fffffff', '2020-11-13 16:34:43');
INSERT INTO `tbcontent` VALUES (116, 164, ' ', 'fffffff', '2020-11-13 16:35:08');
INSERT INTO `tbcontent` VALUES (117, 165, NULL, '11111', '2020-11-13 16:35:30');
INSERT INTO `tbcontent` VALUES (118, 166, NULL, 'ffffff', '2020-12-18 00:26:59');

-- ----------------------------
-- Table structure for tbimages
-- ----------------------------
DROP TABLE IF EXISTS `tbimages`;
CREATE TABLE `tbimages`  (
  `id_Image` int(255) NOT NULL AUTO_INCREMENT,
  `Name_Image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_Post` int(255) NOT NULL,
  PRIMARY KEY (`id_Image`) USING BTREE,
  INDEX `FK_tbImage_tbPost`(`id_Post`) USING BTREE,
  CONSTRAINT `FK_tbImage_tbPost` FOREIGN KEY (`id_Post`) REFERENCES `tbpost` (`id_Post`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbimages
-- ----------------------------
INSERT INTO `tbimages` VALUES (2, 'http://localhost/foodpital/Assets/PostImage/51e40bb361f03316d83dd03486261bb6.jpg', 0);
INSERT INTO `tbimages` VALUES (34, 'http://localhost/foodpital/Assets/PostImage/856.jpg', 157);
INSERT INTO `tbimages` VALUES (35, 'http://localhost/foodpital/Assets/PostImage/881.jpeg', 158);
INSERT INTO `tbimages` VALUES (37, 'http://localhost/foodpital/Assets/PostImage/779.jpg', 159);
INSERT INTO `tbimages` VALUES (38, 'http://localhost/foodpital/Assets/PostImage/636.jpg', 161);
INSERT INTO `tbimages` VALUES (39, 'http://localhost/foodpital/Assets/PostImage/600.jpg', 160);
INSERT INTO `tbimages` VALUES (42, 'http://localhost/foodpital/Assets/PostImage/368.png', 164);
INSERT INTO `tbimages` VALUES (43, 'http://localhost/foodpital/Assets/PostImage/445.png', 165);
INSERT INTO `tbimages` VALUES (44, 'http://localhost/foodpital/Assets/PostImage/103.png', 166);

-- ----------------------------
-- Table structure for tbnotification
-- ----------------------------
DROP TABLE IF EXISTS `tbnotification`;
CREATE TABLE `tbnotification`  (
  `id_Notification` int(255) NOT NULL AUTO_INCREMENT,
  `id_User` int(255) NOT NULL,
  `id_TypeNotification` int(255) NOT NULL,
  `Read` bit(1) NOT NULL,
  `DateTime` datetime(0) NOT NULL DEFAULT current_timestamp(0),
  `id_UserSend` int(255) NOT NULL,
  PRIMARY KEY (`id_Notification`) USING BTREE,
  INDEX `FK_idUser_tbUser`(`id_User`) USING BTREE,
  INDEX `FK_idUserSend_tbUser`(`id_UserSend`) USING BTREE,
  INDEX `FK_idType_tbTypeNotification`(`id_TypeNotification`) USING BTREE,
  CONSTRAINT `FK_idType_tbTypeNotification` FOREIGN KEY (`id_TypeNotification`) REFERENCES `tbtypenotification` (`id_TypeNotification`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_idUserSend_tbUser` FOREIGN KEY (`id_UserSend`) REFERENCES `tbprofile` (`id_User`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_idUser_tbUser` FOREIGN KEY (`id_User`) REFERENCES `tbprofile` (`id_User`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbnotification
-- ----------------------------
INSERT INTO `tbnotification` VALUES (2, 2, 1, b'0', '2020-10-04 16:21:33', 9);
INSERT INTO `tbnotification` VALUES (3, 2, 1, b'1', '2020-10-06 17:19:33', 9);
INSERT INTO `tbnotification` VALUES (4, 9, 1, b'1', '2020-10-10 09:16:23', 9);
INSERT INTO `tbnotification` VALUES (5, 2, 1, b'1', '2020-10-10 09:38:09', 9);
INSERT INTO `tbnotification` VALUES (6, 2, 1, b'1', '2020-10-10 10:32:14', 2);
INSERT INTO `tbnotification` VALUES (7, 2, 1, b'1', '2020-10-10 10:32:57', 2);
INSERT INTO `tbnotification` VALUES (8, 2, 1, b'1', '2020-10-10 11:20:37', 2);
INSERT INTO `tbnotification` VALUES (9, 2, 1, b'1', '2020-10-10 11:20:54', 2);
INSERT INTO `tbnotification` VALUES (11, 2, 1, b'1', '2020-10-11 16:03:36', 13);
INSERT INTO `tbnotification` VALUES (12, 2, 1, b'1', '2020-10-11 16:03:40', 13);
INSERT INTO `tbnotification` VALUES (13, 2, 1, b'1', '2020-10-11 16:03:44', 13);
INSERT INTO `tbnotification` VALUES (14, 2, 1, b'1', '2020-10-11 16:03:51', 13);
INSERT INTO `tbnotification` VALUES (15, 2, 1, b'1', '2020-10-11 16:03:53', 13);
INSERT INTO `tbnotification` VALUES (16, 2, 1, b'1', '2020-10-11 22:16:11', 14);
INSERT INTO `tbnotification` VALUES (17, 2, 1, b'1', '2020-10-11 22:16:15', 14);
INSERT INTO `tbnotification` VALUES (18, 2, 1, b'1', '2020-10-11 22:35:49', 14);
INSERT INTO `tbnotification` VALUES (20, 2, 3, b'1', '2020-10-11 22:41:18', 14);
INSERT INTO `tbnotification` VALUES (21, 2, 1, b'1', '2020-10-17 15:22:25', 13);
INSERT INTO `tbnotification` VALUES (22, 2, 1, b'1', '2020-11-16 18:01:24', 16);
INSERT INTO `tbnotification` VALUES (23, 2, 1, b'1', '2020-11-16 18:01:28', 16);
INSERT INTO `tbnotification` VALUES (24, 2, 1, b'1', '2020-11-16 18:03:52', 16);

-- ----------------------------
-- Table structure for tbpermission
-- ----------------------------
DROP TABLE IF EXISTS `tbpermission`;
CREATE TABLE `tbpermission`  (
  `id_Permission` int(255) NOT NULL AUTO_INCREMENT,
  `Name_Permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_Permission`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbpermission
-- ----------------------------
INSERT INTO `tbpermission` VALUES (1, 'user');
INSERT INTO `tbpermission` VALUES (2, 'admin');
INSERT INTO `tbpermission` VALUES (4, 'guest');

-- ----------------------------
-- Table structure for tbpost
-- ----------------------------
DROP TABLE IF EXISTS `tbpost`;
CREATE TABLE `tbpost`  (
  `id_Post` int(255) NOT NULL AUTO_INCREMENT,
  `id_User` int(255) NOT NULL,
  `id_Topic` int(255) NULL DEFAULT NULL,
  `DateTimePost` datetime(0) NOT NULL DEFAULT current_timestamp(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id_Post`) USING BTREE,
  INDEX `FK_tbPost_tbProfile`(`id_User`) USING BTREE,
  INDEX `FK_tbPost_tbTopic`(`id_Topic`) USING BTREE,
  CONSTRAINT `FK_tbPost_tbProfile` FOREIGN KEY (`id_User`) REFERENCES `tbprofile` (`id_User`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_tbPost_tbTopic` FOREIGN KEY (`id_Topic`) REFERENCES `tbtopic` (`id_Topic`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 167 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbpost
-- ----------------------------
INSERT INTO `tbpost` VALUES (157, 2, 1, '2020-10-16 10:59:55');
INSERT INTO `tbpost` VALUES (158, 2, 3, '2020-10-16 11:00:18');
INSERT INTO `tbpost` VALUES (159, 2, 1, '2020-10-16 11:11:22');
INSERT INTO `tbpost` VALUES (160, 2, 1, '2020-10-16 11:12:06');
INSERT INTO `tbpost` VALUES (161, 2, 1, '2020-10-16 11:17:19');
INSERT INTO `tbpost` VALUES (164, 2, 1, '2020-11-13 16:34:43');
INSERT INTO `tbpost` VALUES (165, 2, 2, '2020-11-13 16:35:30');
INSERT INTO `tbpost` VALUES (166, 2, 3, '2020-12-18 00:26:59');

-- ----------------------------
-- Table structure for tbprofile
-- ----------------------------
DROP TABLE IF EXISTS `tbprofile`;
CREATE TABLE `tbprofile`  (
  `id_User` int(255) NOT NULL,
  `Name_User` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `BOD_User` date NOT NULL,
  `Sex_User` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Email_User` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Avatar_User` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'http://localhost/foodpital/Assets/AvatarUser/con-cho.jpg',
  PRIMARY KEY (`id_User`) USING BTREE,
  CONSTRAINT `FK_Profile_UserSignIn` FOREIGN KEY (`id_User`) REFERENCES `tbusersignin` (`id_User`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbprofile
-- ----------------------------
INSERT INTO `tbprofile` VALUES (2, 'Tuấn kiet', '2000-01-15', 'a', 'kietdat1612000@gmail.com', '../../Assets/AvatarUser/302.png\r\n\r\n');
INSERT INTO `tbprofile` VALUES (9, 'Long Ngáo', '2020-10-07', 'b', 'longngao123@gmail.com', '..\\..\\Assets\\AvatarUser\\47133428_2268507533394813_7476378880727580672_n.jpg');
INSERT INTO `tbprofile` VALUES (13, 'Minh Châu', '2020-10-11', '0', '123456', 'http://localhost/foodpital/Assets/AvatarUser/con-cho.jpg');
INSERT INTO `tbprofile` VALUES (14, 'châu chó', '2020-10-11', '0', '123', 'http://localhost/foodpital/Assets/AvatarUser/con-cho.jpg');
INSERT INTO `tbprofile` VALUES (15, 'Cầy Tơ 7 Món Rựa Mận', '2000-01-16', '0', 'cayto7mon', 'http://localhost/foodpital/Assets/AvatarUser/con-cho.jpg');
INSERT INTO `tbprofile` VALUES (16, 'tuankiet tttt', '2020-11-13', '0', 'tuankiet', 'http://localhost/foodpital/Assets/AvatarUser/con-cho.jpg');

-- ----------------------------
-- Table structure for tbtopic
-- ----------------------------
DROP TABLE IF EXISTS `tbtopic`;
CREATE TABLE `tbtopic`  (
  `id_Topic` int(255) NOT NULL AUTO_INCREMENT,
  `Name_Topic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_Topic`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbtopic
-- ----------------------------
INSERT INTO `tbtopic` VALUES (1, 'How To Cook');
INSERT INTO `tbtopic` VALUES (2, 'Fast Food');
INSERT INTO `tbtopic` VALUES (3, 'dmm');

-- ----------------------------
-- Table structure for tbtypenotification
-- ----------------------------
DROP TABLE IF EXISTS `tbtypenotification`;
CREATE TABLE `tbtypenotification`  (
  `id_TypeNotification` int(255) NOT NULL,
  `TypeNotification` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_TypeNotification`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbtypenotification
-- ----------------------------
INSERT INTO `tbtypenotification` VALUES (1, 'Đã Vote Bài Viết Của Bạn');
INSERT INTO `tbtypenotification` VALUES (3, 'Đã Bình Luận Vào Bài Viết Của Bạn ');

-- ----------------------------
-- Table structure for tbusersignin
-- ----------------------------
DROP TABLE IF EXISTS `tbusersignin`;
CREATE TABLE `tbusersignin`  (
  `id_User` int(255) NOT NULL AUTO_INCREMENT COMMENT 'id_User',
  `User_Sign` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Email For SignIn',
  `User_Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Password for SignIn',
  `id_Permission` int(255) NOT NULL,
  PRIMARY KEY (`id_User`) USING BTREE,
  INDEX `FK_UserSignIn_Permission`(`id_Permission`) USING BTREE,
  CONSTRAINT `FK_UserSignIn_Permission` FOREIGN KEY (`id_Permission`) REFERENCES `tbpermission` (`id_Permission`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbusersignin
-- ----------------------------
INSERT INTO `tbusersignin` VALUES (2, 'tuankiet', 'tuankiet161211', 2);
INSERT INTO `tbusersignin` VALUES (9, 'longngao', 'Tuankiet161211', 1);
INSERT INTO `tbusersignin` VALUES (13, 'minhchau', '123456', 1);
INSERT INTO `tbusersignin` VALUES (14, 'chaucho', '123', 1);
INSERT INTO `tbusersignin` VALUES (15, 'cayto7mon@gmail.com', 'cayto7mon', 1);
INSERT INTO `tbusersignin` VALUES (16, 'tuankiet111', 'tuankiet', 1);

-- ----------------------------
-- Table structure for tbvote
-- ----------------------------
DROP TABLE IF EXISTS `tbvote`;
CREATE TABLE `tbvote`  (
  `id_Vote` int(255) NOT NULL AUTO_INCREMENT,
  `id_Post` int(255) NOT NULL,
  `id_User` int(255) NOT NULL,
  `voteValue` int(255) NOT NULL,
  PRIMARY KEY (`id_Vote`) USING BTREE,
  INDEX `FK_tbVote_tbPost`(`id_Post`) USING BTREE,
  INDEX `FK_tbVote_tbProfile`(`id_User`) USING BTREE,
  CONSTRAINT `FK_tbVote_tbPost` FOREIGN KEY (`id_Post`) REFERENCES `tbpost` (`id_Post`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_tbVote_tbProfile` FOREIGN KEY (`id_User`) REFERENCES `tbprofile` (`id_User`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbvote
-- ----------------------------
INSERT INTO `tbvote` VALUES (3, 0, 2, 3);
INSERT INTO `tbvote` VALUES (34, 158, 2, 5);
INSERT INTO `tbvote` VALUES (35, 157, 2, 2);
INSERT INTO `tbvote` VALUES (36, 161, 13, 5);
INSERT INTO `tbvote` VALUES (37, 165, 2, 5);
INSERT INTO `tbvote` VALUES (39, 164, 16, 5);
INSERT INTO `tbvote` VALUES (40, 165, 16, 5);
INSERT INTO `tbvote` VALUES (41, 159, 2, 3);
INSERT INTO `tbvote` VALUES (42, 166, 2, 5);

SET FOREIGN_KEY_CHECKS = 1;
