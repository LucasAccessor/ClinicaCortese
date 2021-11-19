-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema consultorio
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `consultorio` ;

-- -----------------------------------------------------
-- Schema consultorio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `consultorio` DEFAULT CHARACTER SET utf8 ;
USE `consultorio` ;

-- -----------------------------------------------------
-- Table `consultorio`.`Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultorio`.`Endereco` (
  `idEndereco` INT NOT NULL,
  `Bairro` VARCHAR(45) NOT NULL,
  `RuaEnd` VARCHAR(45) NOT NULL,
  `NumeroEnd` INT NOT NULL,
  `ComplementoEnd` VARCHAR(45) NULL,
  `CEP` INT NOT NULL,
  PRIMARY KEY (`idEndereco`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `consultorio`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultorio`.`Cliente` (
  `idCliente` INT NOT NULL,
  `NomeCliente` VARCHAR(45) NOT NULL,
  `SobrenomeCliente` VARCHAR(45) NOT NULL,
  `DataNascCliente` DATETIME NOT NULL,
  `CPF` VARCHAR(45) NOT NULL,
  `EmailCliente` VARCHAR(45) NOT NULL,
  `TelefoneCelular` INT NOT NULL,
  `idEndereco` INT NOT NULL,
  PRIMARY KEY (`idCliente`),
  INDEX `idCliente_idEndereco_idx` (`idEndereco` ASC) VISIBLE,
  CONSTRAINT `idCliente_idEndereco`
    FOREIGN KEY (`idEndereco`)
    REFERENCES `consultorio`.`Endereco` (`idEndereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `consultorio`.`Dentista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultorio`.`Dentista` (
  `idDentista` INT NOT NULL,
  `NomeDentista` VARCHAR(45) NOT NULL,
  `CRO` INT NOT NULL,
  `CPF` INT NOT NULL,
  `DataNascDentista` DATE NOT NULL,
  `EmailDentista` VARCHAR(45) NOT NULL,
  `TelefoneCelular` INT NOT NULL,
  PRIMARY KEY (`idDentista`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `consultorio`.`Consultas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultorio`.`Consultas` (
  `idConsultas` INT NOT NULL,
  `DataConsulta` DATE NOT NULL,
  `HorarioConsulta` TIME NOT NULL,
  `idCliente` INT NOT NULL,
  `idDentista` INT NOT NULL,
  PRIMARY KEY (`idConsultas`),
  INDEX `idColsulta_idCliente_idx` (`idCliente` ASC) VISIBLE,
  INDEX `idConsulta_idDentista_idx` (`idDentista` ASC) VISIBLE,
  CONSTRAINT `idColsulta_idCliente`
    FOREIGN KEY (`idCliente`)
    REFERENCES `consultorio`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idConsulta_idDentista`
    FOREIGN KEY (`idDentista`)
    REFERENCES `consultorio`.`Dentista` (`idDentista`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
