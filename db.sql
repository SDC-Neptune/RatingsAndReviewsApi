--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: characteristic_reviews; Type: TABLE; Schema: public; Owner: ericfernandez
--

CREATE TABLE public.characteristic_reviews (
    id integer NOT NULL,
    characteristic_id integer,
    review_id integer,
    value integer
);


ALTER TABLE public.characteristic_reviews OWNER TO ericfernandez;

--
-- Name: characteristics; Type: TABLE; Schema: public; Owner: ericfernandez
--

CREATE TABLE public.characteristics (
    id integer NOT NULL,
    product_id integer,
    name character varying(255)
);


ALTER TABLE public.characteristics OWNER TO ericfernandez;

--
-- Name: characterstic_reviews; Type: TABLE; Schema: public; Owner: ericfernandez
--

CREATE TABLE public.characterstic_reviews (
    id integer NOT NULL,
    characteristic_id integer,
    review_id integer,
    value integer
);


ALTER TABLE public.characterstic_reviews OWNER TO ericfernandez;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: ericfernandez
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    product_id integer,
    rating integer,
    date bigint,
    summary character varying(255),
    body character varying(500),
    recommend boolean,
    reported boolean,
    reviewer_name character varying(255),
    reviewer_email character varying(255),
    response character varying(255),
    helpfulness integer
);


ALTER TABLE public.reviews OWNER TO ericfernandez;

--
-- Name: reviews_photos; Type: TABLE; Schema: public; Owner: ericfernandez
--

CREATE TABLE public.reviews_photos (
    id integer NOT NULL,
    review_id integer,
    url character varying(255)
);


ALTER TABLE public.reviews_photos OWNER TO ericfernandez;

--
-- Name: characteristic_reviews characteristic_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: ericfernandez
--

ALTER TABLE ONLY public.characteristic_reviews
    ADD CONSTRAINT characteristic_reviews_pkey PRIMARY KEY (id);


--
-- Name: characteristics characteristics_pkey; Type: CONSTRAINT; Schema: public; Owner: ericfernandez
--

ALTER TABLE ONLY public.characteristics
    ADD CONSTRAINT characteristics_pkey PRIMARY KEY (id);


--
-- Name: characterstic_reviews characterstic_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: ericfernandez
--

ALTER TABLE ONLY public.characterstic_reviews
    ADD CONSTRAINT characterstic_reviews_pkey PRIMARY KEY (id);


--
-- Name: reviews_photos reviews_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: ericfernandez
--

ALTER TABLE ONLY public.reviews_photos
    ADD CONSTRAINT reviews_photos_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: ericfernandez
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

