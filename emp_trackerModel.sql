-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema emp_trackerDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emp_trackerDB` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `emp_trackerDB` ;

-- -----------------------------------------------------
-- Table `emp_trackerDB`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_trackerDB`.`department` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `emp_trackerDB`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dept_name` VARCHAR(30) NULL,
  `department_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `emp_trackerDB`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_trackerDB`.`role` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `emp_trackerDB`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NULL,
  `salary` DECIMAL(6,2) NOT NULL,
  `dept_id` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_role_department1`
    FOREIGN KEY (`dept_id`)
    REFERENCES `emp_trackerDB`.`department` (`department_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_role_department1_idx` ON `emp_trackerDB`.`role` (`dept_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `emp_trackerDB`.`employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_trackerDB`.`employee` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `emp_trackerDB`.`employee` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(30) NULL,
  `last_name` VARCHAR(30) NULL,
  `role_id` INT NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_employee_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `emp_trackerDB`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_employee_role1_idx` ON `emp_trackerDB`.`employee` (`role_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `emp_trackerDB`.`role_has_role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_trackerDB`.`role_has_role` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `emp_trackerDB`.`role_has_role` (
  `role_id` INT NOT NULL,
  `role_id1` INT NOT NULL,
  PRIMARY KEY (`role_id`, `role_id1`),
  CONSTRAINT `fk_role_has_role_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `emp_trackerDB`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_role_has_role_role2`
    FOREIGN KEY (`role_id1`)
    REFERENCES `emp_trackerDB`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_role_has_role_role2_idx` ON `emp_trackerDB`.`role_has_role` (`role_id1` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_role_has_role_role1_idx` ON `emp_trackerDB`.`role_has_role` (`role_id` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `emp_trackerDB`.`role_has_role1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp_trackerDB`.`role_has_role1` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `emp_trackerDB`.`role_has_role1` (
  `role_id` INT NOT NULL,
  `role_id1` INT NOT NULL,
  PRIMARY KEY (`role_id`, `role_id1`),
  CONSTRAINT `fk_role_has_role1_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `emp_trackerDB`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_role_has_role1_role2`
    FOREIGN KEY (`role_id1`)
    REFERENCES `emp_trackerDB`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_role_has_role1_role2_idx` ON `emp_trackerDB`.`role_has_role1` (`role_id1` ASC) VISIBLE;

SHOW WARNINGS;
CREATE INDEX `fk_role_has_role1_role1_idx` ON `emp_trackerDB`.`role_has_role1` (`role_id` ASC) VISIBLE;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

 INSERT INTO department (dept_name) VALUES ("Sales"),("Finance"),("Engineering");
 INSERT INTO emp_role (title, salary, dept_id) VALUES ("Lead Engineer", 150000.00, 3);