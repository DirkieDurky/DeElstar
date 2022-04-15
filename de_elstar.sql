-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 15, 2022 at 04:46 AM
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
  `monthPrice` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `bike_id` int(10) UNSIGNED NOT NULL,
  `category` enum('city','electric','mountain','race','child','hybrid','cruiser','road','touring') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

-- --------------------------------------------------------

--
-- Table structure for table `purchase_bikes`
--

CREATE TABLE `purchase_bikes` (
  `purchase_id` int(10) UNSIGNED NOT NULL,
  `bike_id` int(10) UNSIGNED NOT NULL
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
  ADD PRIMARY KEY (`bike_id`,`category`),
  ADD KEY `bike_id` (`bike_id`);

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
  ADD KEY `customer` (`customer`),
  ADD KEY `bike` (`bike`);

--
-- Indexes for table `purchase_bikes`
--
ALTER TABLE `purchase_bikes`
  ADD PRIMARY KEY (`purchase_id`,`bike_id`),
  ADD KEY `purchase_id` (`purchase_id`),
  ADD KEY `bike_id` (`bike_id`);

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
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`bike_id`) REFERENCES `bikes` (`id`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`customer`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`bike`) REFERENCES `bikes` (`id`);

--
-- Constraints for table `purchase_bikes`
--
ALTER TABLE `purchase_bikes`
  ADD CONSTRAINT `purchase_bikes_ibfk_1` FOREIGN KEY (`bike_id`) REFERENCES `bikes` (`id`),
  ADD CONSTRAINT `purchase_bikes_ibfk_2` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
