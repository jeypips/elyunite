-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 29, 2019 at 04:02 PM
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
-- Table structure for table `aiv_sub_items`
--

CREATE TABLE `aiv_sub_items` (
  `id` int(11) NOT NULL,
  `vsi_id` int(11) DEFAULT NULL,
  `display` varchar(500) DEFAULT NULL,
  `vsi_value` varchar(100) DEFAULT NULL,
  `vsi_min` varchar(100) DEFAULT NULL,
  `vsi_max` varchar(100) DEFAULT NULL,
  `data_type` int(11) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aiv_sub_items`
--

INSERT INTO `aiv_sub_items` (`id`, `vsi_id`, `display`, `vsi_value`, `vsi_min`, `vsi_max`, `data_type`, `system_log`) VALUES
(1, 2, 'Buy and Sell', 'Buy and Sell', NULL, NULL, NULL, '2019-10-28 20:40:29'),
(2, 2, 'Tourism Related', 'Tourism Related', NULL, NULL, NULL, '2019-10-28 20:40:29'),
(3, 2, 'Agriculture, Fishery, Livestock', 'Agriculture, Fishery, Livestock', NULL, NULL, NULL, '2019-10-28 20:40:29'),
(4, 2, 'Services (Manicure, masseur)', 'Services (Manicure, masseur)', NULL, NULL, NULL, '2019-10-28 20:40:29'),
(5, 2, 'Others', 'Others', NULL, NULL, NULL, '2019-10-28 20:40:29');

-- --------------------------------------------------------

--
-- Table structure for table `aspects_items`
--

CREATE TABLE `aspects_items` (
  `id` int(11) NOT NULL,
  `aspect_id` int(11) DEFAULT NULL,
  `item_name` varchar(100) DEFAULT NULL,
  `item_type` int(11) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aspects_items`
--

INSERT INTO `aspects_items` (`id`, `aspect_id`, `item_name`, `item_type`, `system_log`) VALUES
(1, 1, 'Employment Status', 4, '2019-10-28 20:40:29');

-- --------------------------------------------------------

--
-- Table structure for table `aspect_item_values`
--

CREATE TABLE `aspect_item_values` (
  `id` int(11) NOT NULL,
  `aspect_item_id` int(11) DEFAULT NULL,
  `display` varchar(500) DEFAULT NULL,
  `siv_value` varchar(100) DEFAULT NULL,
  `siv_min` varchar(100) DEFAULT NULL,
  `siv_max` varchar(100) DEFAULT NULL,
  `data_type` int(11) DEFAULT NULL,
  `row_type` int(11) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `aspect_item_values`
--

INSERT INTO `aspect_item_values` (`id`, `aspect_item_id`, `display`, `siv_value`, `siv_min`, `siv_max`, `data_type`, `row_type`, `system_log`) VALUES
(1, 1, 'Employed', 'Employed', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(2, 1, 'Self-employed', 'Self-employed', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(3, 1, 'Unemployed', 'Unemployed', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(4, 1, 'Schooling', 'Schooling', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(5, 1, 'Retired', 'Retired', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29');

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
-- Table structure for table `sections_aspects`
--

CREATE TABLE `sections_aspects` (
  `id` int(11) NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `aspect_name` varchar(100) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sections_aspects`
--

INSERT INTO `sections_aspects` (`id`, `section_id`, `aspect_name`, `system_log`) VALUES
(1, 2, 'JOB AND INCOME', '2019-10-28 20:40:29');

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
(1, 1, 'Sex', 4, '2019-10-28 20:40:29'),
(2, 1, 'Marital Status', 4, '2019-10-28 20:40:29'),
(3, 1, 'Age', 1, '2019-10-28 20:40:29');

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

--
-- Dumping data for table `section_item_values`
--

INSERT INTO `section_item_values` (`id`, `section_item_id`, `display`, `siv_value`, `siv_min`, `siv_max`, `data_type`, `row_type`, `system_log`) VALUES
(1, 1, 'Male', 'Male', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(2, 1, 'Female', 'Female', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(3, 2, 'Single', 'Single', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(4, 2, 'Married', 'Married', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(5, 2, 'Live-in', 'Live-in', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(6, 2, 'Widowed', 'Widowed', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(7, 2, 'Separated', 'Separated', NULL, NULL, NULL, NULL, '2019-10-28 20:40:29'),
(8, 3, '18 - 29 years old', NULL, '18', '29', NULL, NULL, '2019-10-28 20:40:29'),
(9, 3, '30 - 39 years old', NULL, '30', '39', NULL, NULL, '2019-10-28 20:40:29'),
(10, 3, '40 - 49 years old', NULL, '40', '49', NULL, NULL, '2019-10-28 20:40:29'),
(11, 3, '50 - 59 years old', NULL, '50', '59', NULL, NULL, '2019-10-28 20:40:29'),
(12, 3, '60 years old and above', NULL, '60', '60', NULL, NULL, '2019-10-28 20:40:29');

-- --------------------------------------------------------

--
-- Table structure for table `siv_sub_items`
--

CREATE TABLE `siv_sub_items` (
  `id` int(11) NOT NULL,
  `vsi_id` int(11) DEFAULT NULL,
  `display` varchar(500) DEFAULT NULL,
  `vsi_value` varchar(100) DEFAULT NULL,
  `vsi_min` varchar(100) DEFAULT NULL,
  `vsi_max` varchar(100) DEFAULT NULL,
  `data_type` int(11) DEFAULT NULL,
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
(1, 'Elyunite Survey', 'A description of elyunite sruvey', '2019-10-28 20:40:29');

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
(1, 1, 'Basic Information', '2019-10-28 20:40:29'),
(2, 1, 'Life Satisfaction', '2019-10-28 20:40:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aiv_sub_items`
--
ALTER TABLE `aiv_sub_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vsi_id` (`vsi_id`);

--
-- Indexes for table `aspects_items`
--
ALTER TABLE `aspects_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aspect_id` (`aspect_id`);

--
-- Indexes for table `aspect_item_values`
--
ALTER TABLE `aspect_item_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aspect_item_id` (`aspect_item_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections_aspects`
--
ALTER TABLE `sections_aspects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_id` (`section_id`);

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
-- Indexes for table `siv_sub_items`
--
ALTER TABLE `siv_sub_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vsi_id` (`vsi_id`);

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
-- AUTO_INCREMENT for table `aiv_sub_items`
--
ALTER TABLE `aiv_sub_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `aspects_items`
--
ALTER TABLE `aspects_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `aspect_item_values`
--
ALTER TABLE `aspect_item_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `sections_aspects`
--
ALTER TABLE `sections_aspects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `sections_items`
--
ALTER TABLE `sections_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `section_item_values`
--
ALTER TABLE `section_item_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `siv_sub_items`
--
ALTER TABLE `siv_sub_items`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `aiv_sub_items`
--
ALTER TABLE `aiv_sub_items`
  ADD CONSTRAINT `aiv_sub_items_ibfk_1` FOREIGN KEY (`vsi_id`) REFERENCES `aspect_item_values` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `aspects_items`
--
ALTER TABLE `aspects_items`
  ADD CONSTRAINT `aspects_items_ibfk_1` FOREIGN KEY (`aspect_id`) REFERENCES `sections_aspects` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `aspect_item_values`
--
ALTER TABLE `aspect_item_values`
  ADD CONSTRAINT `aspect_item_values_ibfk_1` FOREIGN KEY (`aspect_item_id`) REFERENCES `aspects_items` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `sections_aspects`
--
ALTER TABLE `sections_aspects`
  ADD CONSTRAINT `sections_aspects_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `surveys_sections` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

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
-- Constraints for table `siv_sub_items`
--
ALTER TABLE `siv_sub_items`
  ADD CONSTRAINT `siv_sub_items_ibfk_1` FOREIGN KEY (`vsi_id`) REFERENCES `section_item_values` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `surveys_sections`
--
ALTER TABLE `surveys_sections`
  ADD CONSTRAINT `surveys_sections_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
