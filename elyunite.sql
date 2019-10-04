-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 04, 2019 at 05:09 PM
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
(2, 'Ashley', 'As', 'Ebreo', 'user', 'user', 2, '2019-08-27 14:40:36');

-- --------------------------------------------------------

--
-- Table structure for table `demographics`
--

CREATE TABLE `demographics` (
  `id` int(11) NOT NULL,
  `survey_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `demographics_items`
--

CREATE TABLE `demographics_items` (
  `id` int(11) NOT NULL,
  `item_name` varchar(200) DEFAULT NULL,
  `item_type` int(11) DEFAULT NULL,
  `predefinced_values` longtext,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `demographics_items`
--

INSERT INTO `demographics_items` (`id`, `item_name`, `item_type`, `predefinced_values`, `system_log`) VALUES
(1, 'Age Bracket', 1, NULL, '2019-10-04 15:33:23'),
(2, 'Sex', 4, NULL, '2019-10-04 15:33:23'),
(3, 'Current Marital Status', 4, NULL, '2019-10-04 15:34:32'),
(4, 'Home Address', 3, NULL, '2019-10-04 15:34:32'),
(5, 'Household Population', 3, NULL, '2019-10-04 15:35:30'),
(6, 'Average Monthly Income', 3, NULL, '2019-10-04 15:35:30'),
(7, 'Average Monthly Expenditures', 3, NULL, '2019-10-04 15:36:48'),
(8, 'Average Monthly Savings', 3, NULL, '2019-10-04 15:36:48'),
(9, 'Poverty Incidence', 3, NULL, '2019-10-04 15:37:21');

-- --------------------------------------------------------

--
-- Table structure for table `demographics_types`
--

CREATE TABLE `demographics_types` (
  `id` int(11) NOT NULL,
  `description` longtext,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `demographics_types`
--

INSERT INTO `demographics_types` (`id`, `description`, `system_log`) VALUES
(1, 'Bracket', '2019-10-04 15:26:15'),
(2, 'Checkbox', '2019-10-04 15:26:15'),
(3, 'Text Input', '2019-10-04 15:26:41'),
(4, 'Radios', '2019-10-04 15:26:41'),
(5, 'Selections', '2019-10-04 15:26:53');

-- --------------------------------------------------------

--
-- Table structure for table `demographic_type_brackets`
--

CREATE TABLE `demographic_type_brackets` (
  `id` int(11) NOT NULL,
  `demographic_id` int(11) DEFAULT NULL,
  `bracket_from` varchar(100) DEFAULT NULL,
  `bracket_to` varchar(100) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `demographic_type_checkboxes`
--

CREATE TABLE `demographic_type_checkboxes` (
  `id` int(11) NOT NULL,
  `demographic_id` int(11) DEFAULT NULL,
  `item` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `demographic_type_inputs`
--

CREATE TABLE `demographic_type_inputs` (
  `id` int(11) NOT NULL,
  `demographic_id` int(11) DEFAULT NULL,
  `item` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `demographic_type_radios`
--

CREATE TABLE `demographic_type_radios` (
  `id` int(11) NOT NULL,
  `demographic_id` int(11) DEFAULT NULL,
  `item` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `demographic_type_selections`
--

CREATE TABLE `demographic_type_selections` (
  `id` int(11) NOT NULL,
  `demographic_id` int(11) DEFAULT NULL,
  `item` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(3, 'Jp', 'Pogi', '225B7B5C2269645C223A5C2264617368626F6172645C222C5C226465736372697074696F6E5C223A5C2244617368626F6172645C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F772044617368626F6172645C222C5C2276616C75655C223A66616C73657D5D7D2C7B5C2269645C223A5C226D61696E74656E616E63655C222C5C226465736372697074696F6E5C223A5C224D61696E74656E616E63655C222C5C2270726976696C656765735C223A5B7B5C2269645C223A312C5C226465736372697074696F6E5C223A5C2253686F77204D61696E74656E616E63655C222C5C2276616C75655C223A66616C73657D5D7D5D22');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `survey_id` int(11) NOT NULL,
  `question` varchar(500) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question_type_brackets`
--

CREATE TABLE `question_type_brackets` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `bracket_from` varchar(100) DEFAULT NULL,
  `bracket_to` varchar(100) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question_type_checkboxes`
--

CREATE TABLE `question_type_checkboxes` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `item` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question_type_radios`
--

CREATE TABLE `question_type_radios` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `item` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `question_type_selections`
--

CREATE TABLE `question_type_selections` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `item` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `respondents`
--

CREATE TABLE `respondents` (
  `id` int(11) NOT NULL,
  `survey_id` int(11) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `respondent_answers`
--

CREATE TABLE `respondent_answers` (
  `id` int(11) NOT NULL,
  `respondent_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `question_type` int(11) DEFAULT NULL,
  `answer` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `respondent_demographics`
--

CREATE TABLE `respondent_demographics` (
  `id` int(11) NOT NULL,
  `respondent_id` int(11) DEFAULT NULL,
  `survey_demographic_id` int(11) DEFAULT NULL,
  `demographic_type` int(11) DEFAULT NULL,
  `answer` varchar(500) NOT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `respondent_general_comments`
--

CREATE TABLE `respondent_general_comments` (
  `id` int(11) NOT NULL,
  `respondent_id` int(11) DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `respondent_suggestions`
--

CREATE TABLE `respondent_suggestions` (
  `id` int(11) NOT NULL,
  `respondent_id` int(11) DEFAULT NULL,
  `suggestion` varchar(500) DEFAULT NULL,
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
  `survey_date` datetime DEFAULT NULL,
  `system_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `demographics`
--
ALTER TABLE `demographics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`survey_id`);

--
-- Indexes for table `demographics_items`
--
ALTER TABLE `demographics_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_type` (`item_type`);

--
-- Indexes for table `demographics_types`
--
ALTER TABLE `demographics_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `demographic_type_brackets`
--
ALTER TABLE `demographic_type_brackets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `demographic_id` (`demographic_id`);

--
-- Indexes for table `demographic_type_checkboxes`
--
ALTER TABLE `demographic_type_checkboxes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `demographic_id` (`demographic_id`);

--
-- Indexes for table `demographic_type_inputs`
--
ALTER TABLE `demographic_type_inputs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `demographic_id` (`demographic_id`);

--
-- Indexes for table `demographic_type_radios`
--
ALTER TABLE `demographic_type_radios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `demographic_id` (`demographic_id`);

--
-- Indexes for table `demographic_type_selections`
--
ALTER TABLE `demographic_type_selections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `demographic_id` (`demographic_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`survey_id`);

--
-- Indexes for table `question_type_brackets`
--
ALTER TABLE `question_type_brackets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `question_type_checkboxes`
--
ALTER TABLE `question_type_checkboxes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `question_type_radios`
--
ALTER TABLE `question_type_radios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `question_type_selections`
--
ALTER TABLE `question_type_selections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `respondents`
--
ALTER TABLE `respondents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_id` (`survey_id`);

--
-- Indexes for table `respondent_answers`
--
ALTER TABLE `respondent_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respondent_id` (`respondent_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `question_type` (`question_type`);

--
-- Indexes for table `respondent_demographics`
--
ALTER TABLE `respondent_demographics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respondent_id` (`respondent_id`),
  ADD KEY `survey_demographic_id` (`survey_demographic_id`),
  ADD KEY `demographic_type` (`demographic_type`);

--
-- Indexes for table `respondent_general_comments`
--
ALTER TABLE `respondent_general_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respondent_id` (`respondent_id`);

--
-- Indexes for table `respondent_suggestions`
--
ALTER TABLE `respondent_suggestions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respondent_id` (`respondent_id`);

--
-- Indexes for table `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `demographics`
--
ALTER TABLE `demographics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `demographics_items`
--
ALTER TABLE `demographics_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `demographics_types`
--
ALTER TABLE `demographics_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `demographic_type_brackets`
--
ALTER TABLE `demographic_type_brackets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `demographic_type_checkboxes`
--
ALTER TABLE `demographic_type_checkboxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `demographic_type_inputs`
--
ALTER TABLE `demographic_type_inputs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `demographic_type_radios`
--
ALTER TABLE `demographic_type_radios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `demographic_type_selections`
--
ALTER TABLE `demographic_type_selections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `question_type_brackets`
--
ALTER TABLE `question_type_brackets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `question_type_checkboxes`
--
ALTER TABLE `question_type_checkboxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `question_type_radios`
--
ALTER TABLE `question_type_radios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `question_type_selections`
--
ALTER TABLE `question_type_selections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `respondents`
--
ALTER TABLE `respondents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `respondent_answers`
--
ALTER TABLE `respondent_answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `respondent_demographics`
--
ALTER TABLE `respondent_demographics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `respondent_general_comments`
--
ALTER TABLE `respondent_general_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `respondent_suggestions`
--
ALTER TABLE `respondent_suggestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `demographics`
--
ALTER TABLE `demographics`
  ADD CONSTRAINT `demographics_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `demographics_items`
--
ALTER TABLE `demographics_items`
  ADD CONSTRAINT `demographics_items_ibfk_1` FOREIGN KEY (`item_type`) REFERENCES `demographics_types` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `demographic_type_brackets`
--
ALTER TABLE `demographic_type_brackets`
  ADD CONSTRAINT `demographic_type_brackets_ibfk_1` FOREIGN KEY (`demographic_id`) REFERENCES `demographics` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `demographic_type_checkboxes`
--
ALTER TABLE `demographic_type_checkboxes`
  ADD CONSTRAINT `demographic_type_checkboxes_ibfk_1` FOREIGN KEY (`demographic_id`) REFERENCES `demographics` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `demographic_type_inputs`
--
ALTER TABLE `demographic_type_inputs`
  ADD CONSTRAINT `demographic_type_inputs_ibfk_1` FOREIGN KEY (`demographic_id`) REFERENCES `demographics` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `demographic_type_radios`
--
ALTER TABLE `demographic_type_radios`
  ADD CONSTRAINT `demographic_type_radios_ibfk_1` FOREIGN KEY (`demographic_id`) REFERENCES `demographics` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `demographic_type_selections`
--
ALTER TABLE `demographic_type_selections`
  ADD CONSTRAINT `demographic_type_selections_ibfk_1` FOREIGN KEY (`demographic_id`) REFERENCES `demographics` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `question_type_brackets`
--
ALTER TABLE `question_type_brackets`
  ADD CONSTRAINT `question_type_brackets_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `question_type_checkboxes`
--
ALTER TABLE `question_type_checkboxes`
  ADD CONSTRAINT `question_type_checkboxes_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `question_type_radios`
--
ALTER TABLE `question_type_radios`
  ADD CONSTRAINT `question_type_radios_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `question_type_selections`
--
ALTER TABLE `question_type_selections`
  ADD CONSTRAINT `question_type_selections_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `respondents`
--
ALTER TABLE `respondents`
  ADD CONSTRAINT `respondents_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `respondent_answers`
--
ALTER TABLE `respondent_answers`
  ADD CONSTRAINT `respondent_answers_ibfk_1` FOREIGN KEY (`respondent_id`) REFERENCES `respondents` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `respondent_demographics`
--
ALTER TABLE `respondent_demographics`
  ADD CONSTRAINT `respondent_demographics_ibfk_1` FOREIGN KEY (`respondent_id`) REFERENCES `respondents` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `respondent_general_comments`
--
ALTER TABLE `respondent_general_comments`
  ADD CONSTRAINT `respondent_general_comments_ibfk_1` FOREIGN KEY (`respondent_id`) REFERENCES `respondents` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `respondent_suggestions`
--
ALTER TABLE `respondent_suggestions`
  ADD CONSTRAINT `respondent_suggestions_ibfk_1` FOREIGN KEY (`respondent_id`) REFERENCES `respondents` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
