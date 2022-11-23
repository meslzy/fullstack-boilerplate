#!/usr/bin/env node

import {Command, Option} from "commander";

import Server from "./server";
import Client from "./client";

const program = new Command();

program.addOption(
  new Option("-m <mode>", "build mode")
);

program.addOption(
  new Option("-t <target>", "build target")
);

program.parse(process.argv);

const options = program.opts();

const mode = options.m;
const target = options.t;

if (target === "server") {
  const server = new Server();

  console.log(`Building server in ${mode} mode`);

  if (mode === "production") {
    server.build();
  }

  if (mode === "development") {
    server.watch();
  }
}

if (target === "client") {
  const client = new Client();

  console.log(`Building client in ${mode} mode`);

  if (mode === "production") {
    client.build();
  }

  if (mode === "development") {
    client.watch();
  }
}