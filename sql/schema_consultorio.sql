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
-- Table `consultorio`.`Horario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultorio`.`Horario` (
  `idHorario` INT NOT NULL,
  `Horario` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idHorario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `consultorio`.`Agendamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `consultorio`.`Agendamento` (
  `idAgendamento` INT NOT NULL AUTO_INCREMENT,
  `NomeCliente` VARCHAR(45) NOT NULL,
  `SobrenomeCliente` VARCHAR(45) NOT NULL,
  `CPF` VARCHAR(11) NOT NULL,
  `EmailCliente` VARCHAR(45) NOT NULL,
  `TelefoneCelular` VARCHAR(12) NOT NULL,
  `Bairro` VARCHAR(45) NOT NULL,
  `RuaEnd` VARCHAR(45) NOT NULL,
  `NumeroEnd` INT NOT NULL,
  `ComplementoEnd` VARCHAR(45) NULL,
  `CEP` INT NOT NULL,
  `ObservacaoConsulta` VARCHAR(243) NULL,
  `DataConsulta` DATE NOT NULL,
  `NomeDentista` VARCHAR(45) NOT NULL,
  `idHorario` INT NOT NULL,
  PRIMARY KEY (`idAgendamento`),
  INDEX `idAgendamento_idHorario_idx` (`idHorario` ASC) VISIBLE,
  CONSTRAINT `idAgendamento_idHorario`
    FOREIGN KEY (`idHorario`)
    REFERENCES `consultorio`.`Horario` (`idHorario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- INSERE HORARIOS DISPONÍVEIS
USE CONSULTORIO;
INSERT INTO horario (idHorario, Horario) VALUES 
	-- MANHA
		(1, '08:00'),
		(2, '08:30'),
		(3, '09:00'),
		(4, '09:30'),
		(5, '10:00'),
		(6, '10:30'),
		(7, '11:00'),
		(8, '11:30'),
		(9, '12:00'),
    -- TARDE
		(10, '14:30'),
		(11, '15:00'),
		(12, '15:30'),
		(13, '16:00'),
		(14, '16:30'),
		(15, '17:00'),
		(16, '17:30'),
		(17, '18:00');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
