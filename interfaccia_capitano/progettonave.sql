-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Set 02, 2019 alle 13:40
-- Versione del server: 10.3.16-MariaDB
-- Versione PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `progettonave`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `arco`
--

CREATE TABLE `arco` (
  `Id` int(11) NOT NULL,
  `X1` int(11) NOT NULL,
  `Y1` int(11) NOT NULL,
  `Piano1` int(11) NOT NULL,
  `X2` int(11) NOT NULL,
  `Y2` int(11) NOT NULL,
  `Piano2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `arco`
--

INSERT INTO `arco` (`Id`, `X1`, `Y1`, `Piano1`, `X2`, `Y2`, `Piano2`) VALUES
(1, 87, 241, 1, 93, 155, 1),
(1, 174, 236, 2, 248, 157, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `beaconnodo`
--

CREATE TABLE `beaconnodo` (
  `X` int(11) NOT NULL,
  `Y` int(11) NOT NULL,
  `Piano` int(11) NOT NULL,
  `IDBeacon` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `beaconnodo`
--

INSERT INTO `beaconnodo` (`X`, `Y`, `Piano`, `IDBeacon`) VALUES
(87, 241, 1, 123),
(87, 241, 2, 123),
(93, 155, 1, 376),
(93, 155, 2, 376),
(174, 236, 2, 2),
(174, 236, 2, 35673),
(248, 157, 2, 6),
(279, 378, 2, 54654),
(322, 487, 2, 66),
(368, 222, 2, 9),
(463, 323, 2, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `nodo`
--

CREATE TABLE `nodo` (
  `X` int(11) NOT NULL,
  `Y` int(11) NOT NULL,
  `Piano` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `nodo`
--

INSERT INTO `nodo` (`X`, `Y`, `Piano`) VALUES
(87, 241, 1),
(93, 155, 1),
(174, 236, 2),
(248, 157, 2),
(322, 487, 2),
(368, 222, 2),
(425, 441, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `Codice` varchar(100) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Cognome` varchar(100) NOT NULL,
  `Gruppo` varchar(100) NOT NULL,
  `Cabina` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`Codice`, `Nome`, `Cognome`, `Gruppo`, `Cabina`) VALUES
('', '', 'undefined', '', ''),
('1', 'ome', 'ognome', 'uppo', 'abina'),
('123', 'Orlando', 'undefined', '', '12'),
('2', 'ome', 'ognome', 'uppo', 'abina'),
('3', 'ome', 'ognome', 'uppo', 'abina'),
('40', 'gio', 'undefined', '', '12');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `arco`
--
ALTER TABLE `arco`
  ADD PRIMARY KEY (`X1`,`Y1`,`Piano1`,`X2`,`Y2`,`Piano2`);

--
-- Indici per le tabelle `beaconnodo`
--
ALTER TABLE `beaconnodo`
  ADD PRIMARY KEY (`X`,`Y`,`Piano`,`IDBeacon`);

--
-- Indici per le tabelle `nodo`
--
ALTER TABLE `nodo`
  ADD PRIMARY KEY (`X`,`Y`,`Piano`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`Codice`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
