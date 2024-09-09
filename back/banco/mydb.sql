-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Empresa` (
  `Cod_empresa` INT NOT NULL AUTO_INCREMENT,
  `Nome_fantasia` VARCHAR(120) NOT NULL,
  `Razao_social` VARCHAR(120) NOT NULL,
  `Email` VARCHAR(120) NOT NULL,
  `CNPJ` INT(14) NOT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Cod_empresa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cliente` (
  `Cod_cliente` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(120) NOT NULL,
  `Email` VARCHAR(120) NOT NULL,
  `Senha` VARCHAR(20) NOT NULL,
  `CPF` INT(14) NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  PRIMARY KEY (`Cod_cliente`),
  INDEX `fk_Cliente_Empresa_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_Cliente_Empresa`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`Empresa` (`Cod_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Produto` (
  `Cod_produto` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(120) NOT NULL,
  `Valor` DECIMAL(9,3) NOT NULL,
  `Quantidade` INT NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  `Altura` DECIMAL(9,4) NULL,
  `Produtocol` DECIMAL(9,4) NULL,
  `Largura` DECIMAL(9,4) NULL,
  PRIMARY KEY (`Cod_produto`),
  INDEX `fk_Produto_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_Produto_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`Empresa` (`Cod_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cargo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cargo` (
  `Cod_cargo` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Salario` VARCHAR(45) NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  PRIMARY KEY (`Cod_cargo`),
  INDEX `fk_cargo_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_cargo_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`Empresa` (`Cod_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`funcionario` (
  `Cod_funcionario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(120) NOT NULL,
  `Email` VARCHAR(120) NOT NULL,
  `Telefone` INT(10) NOT NULL,
  `foto` VARCHAR(120) NOT NULL,
  `CPF` INT(14) NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  `cargo_Cod_cargo` INT NOT NULL,
  `senha` VARCHAR(35) NOT NULL,
  PRIMARY KEY (`Cod_funcionario`),
  INDEX `fk_funcionario_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  INDEX `fk_funcionario_cargo1_idx` (`cargo_Cod_cargo` ASC) VISIBLE,
  CONSTRAINT `fk_funcionario_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`Empresa` (`Cod_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_funcionario_cargo1`
    FOREIGN KEY (`cargo_Cod_cargo`)
    REFERENCES `mydb`.`cargo` (`Cod_cargo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`imagem_cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`imagem_cliente` (
  `Cliente_Cod_cliente` INT NOT NULL,
  `nome` VARCHAR(225) NOT NULL,
  `data` LONGBLOB NOT NULL,
  `mimetype` VARCHAR(100) NOT NULL,
  `tamanho` BIGINT NOT NULL,
  INDEX `fk_imagem_cliente_Cliente1_idx` (`Cliente_Cod_cliente` ASC) VISIBLE,
  PRIMARY KEY (`Cliente_Cod_cliente`),
  CONSTRAINT `fk_imagem_cliente_Cliente1`
    FOREIGN KEY (`Cliente_Cod_cliente`)
    REFERENCES `mydb`.`Cliente` (`Cod_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`imagem_empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`imagem_empresa` (
  `Empresa_Cod_empresa` INT NOT NULL,
  `nome` VARCHAR(225) NOT NULL,
  `data` LONGBLOB NOT NULL,
  `mimetype` VARCHAR(100) NOT NULL,
  `tamanho` BIGINT NOT NULL,
  INDEX `fk_imagem_cliente_copy1_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_imagem_cliente_copy1_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`Empresa` (`Cod_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`imagem_produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`imagem_produto` (
  `Produto_Cod_produto` INT NOT NULL,
  `nome` VARCHAR(225) NOT NULL,
  `data` LONGBLOB NOT NULL,
  `mimetype` VARCHAR(100) NOT NULL,
  `tamanho` BIGINT NOT NULL,
  INDEX `fk_imagem_empresa_copy1_Produto1_idx` (`Produto_Cod_produto` ASC) VISIBLE,
  CONSTRAINT `fk_imagem_empresa_copy1_Produto1`
    FOREIGN KEY (`Produto_Cod_produto`)
    REFERENCES `mydb`.`Produto` (`Cod_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`imagem_produto_copy1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`imagem_produto_copy1` (
  `funcionario_Cod_funcionario` INT NOT NULL,
  `nome` VARCHAR(225) NOT NULL,
  `data` LONGBLOB NOT NULL,
  `mimetype` VARCHAR(100) NOT NULL,
  `tamanho` BIGINT NOT NULL,
  INDEX `fk_imagem_produto_copy1_funcionario1_idx` (`funcionario_Cod_funcionario` ASC) VISIBLE,
  CONSTRAINT `fk_imagem_produto_copy1_funcionario1`
    FOREIGN KEY (`funcionario_Cod_funcionario`)
    REFERENCES `mydb`.`funcionario` (`Cod_funcionario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Orcamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Orcamento` (
  `Cod_orcamento` INT NOT NULL AUTO_INCREMENT,
  `Nome_cliente` VARCHAR(120) NOT NULL,
  `Descricao` VARCHAR(120) NOT NULL,
  `Valor` DECIMAL(9,4) NOT NULL,
  `Desconto` DECIMAL(9,4) NOT NULL,
  `Data_inicio` DATETIME NOT NULL,
  `Data_entrega` DATETIME NOT NULL,
  `Empresa_Cod_empresa` INT NOT NULL,
  PRIMARY KEY (`Cod_orcamento`),
  INDEX `fk_Orcamento_Empresa1_idx` (`Empresa_Cod_empresa` ASC) VISIBLE,
  CONSTRAINT `fk_Orcamento_Empresa1`
    FOREIGN KEY (`Empresa_Cod_empresa`)
    REFERENCES `mydb`.`Empresa` (`Cod_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
