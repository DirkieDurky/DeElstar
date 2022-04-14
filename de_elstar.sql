-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2022 at 12:00 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `de_elstar`
--
CREATE DATABASE IF NOT EXISTS `de_elstar` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `de_elstar`;

-- --------------------------------------------------------

--
-- Table structure for table `bikes`
--

CREATE TABLE `bikes` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` enum('mens','womens','other') NOT NULL,
  `size` int(11) NOT NULL,
  `electric` tinyint(1) NOT NULL,
  `color` varchar(35) NOT NULL,
  `brand` varchar(35) NOT NULL,
  `model` varchar(35) DEFAULT NULL,
  `buy_date` date NOT NULL,
  `comment` text NOT NULL,
  `picture` blob DEFAULT NULL,
  `dayPrice` decimal(10,0) NOT NULL,
  `weekendPrice` decimal(10,0) NOT NULL,
  `weekPrice` decimal(10,0) NOT NULL,
  `monthPrice` decimal(10,0) NOT NULL,
  `purchaseHistory` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bikes`
--

INSERT INTO `bikes` (`id`, `type`, `size`, `electric`, `color`, `brand`, `model`, `buy_date`, `comment`, `picture`, `dayPrice`, `weekendPrice`, `weekPrice`, `monthPrice`, `purchaseHistory`) VALUES
(0, 'mens', 4, 0, '#ff00ff', 'Batavus', '3', '2022-04-12', 'test', NULL, '3', '4', '2', '1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `fiets_id` int(10) UNSIGNED NOT NULL,
  `category` enum('city','electric','mountain','race','child','hybrid','cruiser','road','touring') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`fiets_id`, `category`) VALUES
(0, 'electric'),
(0, 'race');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstName` varchar(35) NOT NULL,
  `middleName` varchar(35) DEFAULT NULL,
  `lastName` varchar(35) NOT NULL,
  `phoneNumber` varchar(35) NOT NULL,
  `emailAddress` varchar(35) NOT NULL,
  `password` varchar(255) NOT NULL,
  `purchaseHistory` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstName`, `middleName`, `lastName`, `phoneNumber`, `emailAddress`, `password`, `purchaseHistory`) VALUES
(72, 'Dirk', '', 'Freijters', '649806407', 'dirk@freijters.nl', 'dirk123!', NULL),
(73, 'Dirk', '', 'Freijters', '649806407', 'dirk@freijters.nl', 'dirk123!', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer` int(10) UNSIGNED NOT NULL,
  `bike` int(10) UNSIGNED NOT NULL,
  `returnTime` datetime NOT NULL,
  `paidPrice` decimal(10,0) NOT NULL,
  `depositAmount` decimal(10,0) NOT NULL,
  `depositPaid` tinyint(1) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bikes`
--
ALTER TABLE `bikes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`fiets_id`,`category`),
  ADD UNIQUE KEY `fiets_id` (`fiets_id`,`category`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer` (`customer`),
  ADD UNIQUE KEY `bike` (`bike`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bikes`
--
ALTER TABLE `bikes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bikes`
--
ALTER TABLE `bikes`
  ADD CONSTRAINT `bikes_ibfk_1` FOREIGN KEY (`id`) REFERENCES `categories` (`fiets_id`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`bike`) REFERENCES `bikes` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`customer`) REFERENCES `customers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
