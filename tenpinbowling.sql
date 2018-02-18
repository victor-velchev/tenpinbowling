-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2018 at 11:58 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tenpinbowling`
--

-- --------------------------------------------------------

--
-- Table structure for table `frames`
--

CREATE TABLE `frames` (
  `game_id` int(11) NOT NULL,
  `number` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `throw_one_a` int(11) NOT NULL,
  `throw_one_b` int(11) NOT NULL,
  `throw_two_a` int(11) DEFAULT NULL,
  `throw_two_b` int(11) DEFAULT NULL,
  `throw_three_a` int(11) DEFAULT NULL,
  `throw_three_b` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `frames`
--

INSERT INTO `frames` (`game_id`, `number`, `throw_one_a`, `throw_one_b`, `throw_two_a`, `throw_two_b`, `throw_three_a`, `throw_three_b`) VALUES
(4, '1', 10, 0, 0, 0, 0, 0),
(4, '2', 10, 0, 0, 0, 0, 0),
(4, '3', 10, 0, 0, 0, 0, 0),
(4, '4', 10, 0, 0, 0, 0, 0),
(4, '5', 10, 0, 0, 0, 0, 0),
(4, '6', 10, 0, 0, 0, 0, 0),
(4, '7', 10, 0, 0, 0, 0, 0),
(4, '8', 10, 0, 0, 0, 0, 0),
(4, '9', 10, 0, 0, 0, 0, 0),
(4, '10', 10, 0, 10, 0, 10, 0),
(5, '1', 1, 2, 0, 0, 0, 0),
(5, '2', 3, 4, 0, 0, 0, 0),
(5, '3', 5, 4, 0, 0, 0, 0),
(5, '4', 3, 2, 0, 0, 0, 0),
(5, '5', 1, 0, 0, 0, 0, 0),
(5, '6', 1, 2, 0, 0, 0, 0),
(5, '7', 3, 4, 0, 0, 0, 0),
(5, '8', 5, 4, 0, 0, 0, 0),
(5, '9', 6, 2, 0, 0, 0, 0),
(5, '10', 4, 3, 0, 0, 0, 0),
(6, '1', 1, 0, 0, 0, 0, 0),
(6, '2', 1, 0, 0, 0, 0, 0),
(6, '3', 1, 0, 0, 0, 0, 0),
(6, '4', 1, 0, 0, 0, 0, 0),
(6, '5', 1, 0, 0, 0, 0, 0),
(6, '6', 1, 0, 0, 0, 0, 0),
(6, '7', 1, 0, 0, 0, 0, 0),
(6, '8', 1, 0, 0, 0, 0, 0),
(6, '9', 1, 0, 0, 0, 0, 0),
(6, '10', 1, 0, 0, 0, 0, 0),
(7, '1', 7, 3, 0, 0, 0, 0),
(7, '2', 7, 3, 0, 0, 0, 0),
(7, '3', 7, 3, 0, 0, 0, 0),
(7, '4', 7, 3, 0, 0, 0, 0),
(7, '5', 7, 3, 0, 0, 0, 0),
(7, '6', 7, 3, 0, 0, 0, 0),
(7, '7', 7, 3, 0, 0, 0, 0),
(7, '8', 7, 3, 0, 0, 0, 0),
(7, '9', 7, 3, 0, 0, 0, 0),
(7, '10', 7, 3, 7, 3, 0, 0),
(12, '1', 3, 2, 0, 0, 0, 0),
(12, '2', 1, 1, 0, 0, 0, 0),
(12, '3', 4, 4, 0, 0, 0, 0),
(12, '4', 4, 6, 0, 0, 0, 0),
(12, '5', 6, 3, 0, 0, 0, 0),
(12, '6', 8, 1, 0, 0, 0, 0),
(12, '7', 3, 0, 0, 0, 0, 0),
(12, '8', 2, 1, 0, 0, 0, 0),
(12, '9', 0, 0, 0, 0, 0, 0),
(12, '10', 3, 6, 0, 0, 0, 0),
(13, '1', 6, 4, 0, 0, 0, 0),
(13, '2', 5, 2, 0, 0, 0, 0),
(13, '3', 7, 0, 0, 0, 0, 0),
(13, '4', 4, 5, 0, 0, 0, 0),
(13, '5', 1, 6, 0, 0, 0, 0),
(13, '6', 3, 4, 0, 0, 0, 0),
(13, '7', 8, 0, 0, 0, 0, 0),
(13, '8', 7, 1, 0, 0, 0, 0),
(13, '9', 3, 5, 0, 0, 0, 0),
(13, '10', 10, 0, 3, 4, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `date`) VALUES
(4, 'Perfect game', '2018-02-17 12:00:53'),
(5, 'Lousy game', '2018-02-17 19:02:42'),
(6, 'Jinxed game', '2018-02-17 19:15:25'),
(7, 'Good game', '2018-02-17 19:18:41'),
(12, 'Randomize', '2018-02-17 21:16:11'),
(13, 'Last game for today', '2018-02-18 16:17:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `frames`
--
ALTER TABLE `frames`
  ADD PRIMARY KEY (`game_id`,`number`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `frames`
--
ALTER TABLE `frames`
  ADD CONSTRAINT `frames_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
