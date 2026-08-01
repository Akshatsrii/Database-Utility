--
-- PostgreSQL database dump
--

\restrict bJ2fD2SYTGrSzn1ECachgYDSNaJloUYi9Ax3tupyfzko1ySKNGm9uNSgA5s66MZ

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: backup_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.backup_logs (
    id integer NOT NULL,
    database_name character varying(100),
    backup_time timestamp without time zone,
    status character varying(20)
);


ALTER TABLE public.backup_logs OWNER TO postgres;

--
-- Name: backup_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.backup_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.backup_logs_id_seq OWNER TO postgres;

--
-- Name: backup_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.backup_logs_id_seq OWNED BY public.backup_logs.id;


--
-- Name: backup_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.backup_logs ALTER COLUMN id SET DEFAULT nextval('public.backup_logs_id_seq'::regclass);


--
-- Data for Name: backup_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.backup_logs (id, database_name, backup_time, status) FROM stdin;
1	PostgreSQL	2026-07-31 14:22:11.966905	Success
2	PostgreSQL	2026-07-31 15:38:56.333562	Success
3	PostgreSQL	2026-08-01 14:38:23.733149	Success
4	PostgreSQL	2026-08-01 14:42:50.798413	Success
5	PostgreSQL	2026-08-01 14:50:48.824232	Success
6	PostgreSQL	2026-08-01 14:52:03.483867	Success
7	PostgreSQL	2026-08-01 14:54:57.406154	Success
8	PostgreSQL	2026-08-01 16:59:19.585487	Success
9	PostgreSQL	2026-08-01 17:04:59.377157	Success
10	PostgreSQL	2026-08-01 17:08:09.46107	Success
11	PostgreSQL	2026-08-01 19:52:37.529852	Success
12	PostgreSQL	2026-08-01 19:56:10.492452	Success
\.


--
-- Name: backup_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.backup_logs_id_seq', 12, true);


--
-- Name: backup_logs backup_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.backup_logs
    ADD CONSTRAINT backup_logs_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict bJ2fD2SYTGrSzn1ECachgYDSNaJloUYi9Ax3tupyfzko1ySKNGm9uNSgA5s66MZ

