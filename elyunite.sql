-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 27, 2019 at 11:24 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elyunite`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `middlename` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `groups` int(11) DEFAULT NULL,
  `system_log` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `firstname`, `middlename`, `lastname`, `username`, `password`, `groups`, `system_log`) VALUES
(1, 'John Paul', 'Gwapo', 'Balanon', 'admin', 'asdasd', 1, '2019-08-27 09:52:26'),
(2, 'Ashley', 'As', 'Ebreo', 'user', 'user', 2, '2019-08-27 14:40:36'),
(3, 'Nikki', 'daf', 'adfd', 'nikkie', '124124214124', 4, '2019-10-22 09:25:49');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `privileges` longtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `privileges`) VALUES
(1, 'Admin', 'Administrator', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A747275657D5D7D5D22'),
(2, 'User', 'User', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A747275657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A66616C73657D5D7D5D22'),
(3, 'Jp', 'Pogi', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A66616C73657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A66616C73657D5D7D5D22'),
(4, 'OPS', 'OPS Office', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A66616C73657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A66616C73657D5D7D5D22');

-- --------------------------------------------------------

--
-- Table structure for table `sections_items`
--

CREATE TABLE `sections_items` (
  `id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `item_name` varchar(100) DEFAULT NULL,
  `item_type` int(11) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sections_items`
--

INSERT INTO `sections_items` (`id`, `section_id`, `item_name`, `item_type`, `system_log`) VALUES
(1, 1, 'Sex', 4, '2019-10-27 23:11:26');

-- --------------------------------------------------------

--
-- Table structure for table `section_item_values`
--

CREATE TABLE `section_item_values` (
  `id` int(11) NOT NULL,
  `section_item_id` int(11) DEFAULT NULL,
  `display` varchar(500) DEFAULT NULL,
  `siv_value` varchar(100) DEFAULT NULL,
  `siv_min` varchar(100) DEFAULT NULL,
  `siv_max` varchar(100) DEFAULT NULL,
  `data_type` int(11) DEFAULT NULL,
  `row_type` int(11) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

CREATE TABLE `surveys` (
  `id` int(11) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surveys`
--

INSERT INTO `surveys` (`id`, `name`, `description`, `system_log`) VALUES
(1, 'Life Satisfaction', 'Satisfaction', '2019-10-27 23:11:26');

-- --------------------------------------------------------

--
-- Table structure for table `surveys_sections`
--

CREATE TABLE `surveys_sections` (
  `id` int(11) NOT NULL,
  `survey_id` int(11) DEFAULT NULL,
  `section_name` varchar(100) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `surveys_sections`
--

INSERT INTO `surveys_sections` (`id`, `survey_id`, `section_name`, `system_log`) VALUES
(1, 1, 'Basic Information', '2019-10-27 23:11:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections_items`
--
ALTER TABLE `sections_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `section_item_values`
--
ALTER TABLE `section_item_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_item_id` (`section_item_id`);

--
-- Indexes for table `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `surveys_sections`
--
ALTER TABLE `surveys_sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`survey_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `sections_items`
--
ALTER TABLE `sections_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `section_item_values`
--
ALTER TABLE `section_item_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `surveys_sections`
--
ALTER TABLE `surveys_sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `sections_items`
--
ALTER TABLE `sections_items`
  ADD CONSTRAINT `sections_items_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `surveys_sections` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `section_item_values`
--
ALTER TABLE `section_item_values`
  ADD CONSTRAINT `section_item_values_ibfk_1` FOREIGN KEY (`section_item_id`) REFERENCES `sections_items` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `surveys_sections`
--
ALTER TABLE `surveys_sections`
  ADD CONSTRAINT `surveys_sections_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
