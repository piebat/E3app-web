-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Lug 23, 2019 alle 11:57
-- Versione del server: 10.1.40-MariaDB
-- Versione PHP: 7.3.5

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

INSERT INTO `arco` (`X1`, `Y1`, `Piano1`, `X2`, `Y2`, `Piano2`) VALUES
(107, 116, 1, 104, 228, 1),
(164, 423, 3, 346, 435, 3),
(165, 335, 3, 17, 324, 3),
(165, 335, 3, 164, 423, 3),
(169, 94, 3, 165, 335, 3),
(169, 94, 3, 340, 84, 3),
(191, 150, 1, 198, 114, 1),
(192, 179, 1, 191, 150, 1),
(194, 252, 1, 192, 179, 1),
(194, 252, 1, 240, 255, 1),
(198, 114, 1, 107, 116, 1),
(203, 104, 2, 314, 181, 2),
(222, 231, 3, 306, 227, 3),
(224, 170, 3, 222, 231, 3),
(232, 141, 1, 191, 150, 1),
(232, 141, 1, 233, 78, 1),
(240, 255, 1, 244, 343, 1),
(264, 203, 1, 268, 253, 1),
(268, 253, 1, 240, 255, 1),
(306, 227, 3, 303, 171, 3),
(311, 141, 1, 232, 141, 1),
(318, 201, 1, 323, 249, 1),
(323, 249, 1, 268, 253, 1),
(340, 84, 3, 349, 228, 3),
(346, 435, 3, 346, 352, 3),
(347, 202, 1, 389, 210, 1),
(347, 249, 1, 323, 249, 1),
(349, 228, 3, 306, 227, 3),
(371, 179, 2, 314, 181, 2),
(371, 179, 2, 367, 235, 2),
(379, 248, 1, 347, 249, 1),
(389, 210, 1, 379, 248, 1),
(401, 141, 1, 311, 141, 1),
(414, 141, 2, 415, 179, 2),
(415, 179, 2, 371, 179, 2),
(448, 139, 2, 449, 180, 2),
(448, 198, 2, 448, 239, 2),
(448, 198, 2, 485, 201, 2),
(449, 180, 2, 415, 179, 2),
(449, 180, 2, 448, 198, 2),
(449, 180, 2, 485, 181, 2),
(482, 146, 1, 483, 228, 1),
(483, 228, 1, 389, 210, 1),
(483, 228, 1, 480, 279, 1),
(483, 228, 1, 593, 224, 1),
(545, 160, 1, 591, 161, 1),
(591, 161, 1, 593, 224, 1),
(591, 161, 1, 640, 162, 1),
(593, 224, 1, 593, 289, 1),
(593, 224, 1, 637, 228, 1),
(593, 289, 1, 562, 290, 1),
(593, 289, 1, 627, 292, 1);

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
(165, 335, 3, 947),
(192, 179, 1, 649),
(194, 252, 1, 149),
(340, 84, 3, 149),
(346, 435, 3, 649),
(448, 139, 2, 947),
(448, 189, 2, 694),
(449, 180, 2, 149),
(593, 289, 1, 947);

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
(203, 104, 1),
(314, 181, 1),
(367, 235, 1),
(371, 179, 1),
(414, 141, 1),
(415, 179, 1),
(448, 139, 1),
(448, 198, 1),
(448, 239, 1),
(449, 180, 1),
(485, 181, 1),
(485, 201, 1);

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
