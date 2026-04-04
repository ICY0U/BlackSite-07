import { registerCommand, getAllCommands, line } from "../command-registry";

/* help */
registerCommand({
  name: "help",
  description: "list available commands",
  handler: () => {
    const cmds = getAllCommands();
    const lines = [
      line("available commands:", { color: "text-term-bright" }),
      line(""),
    ];
    for (const cmd of cmds) {
      lines.push(
        line(`  ${cmd.name.padEnd(14)} ${cmd.description}`, {
          color: "text-term-text",
        }),
      );
    }
    lines.push(line(""));
    return { lines };
  },
});

/* clear -- handled specially by Terminal, but register for help listing */
registerCommand({
  name: "clear",
  description: "clear terminal output",
  handler: () => ({ lines: [] }),
});

/* echo */
registerCommand({
  name: "echo",
  description: "print text to terminal",
  handler: (args) => ({
    lines: [line(args.join(" "))],
  }),
});

/* whoami */
registerCommand({
  name: "whoami",
  description: "show current user",
  handler: () => ({
    lines: [line("guest")],
  }),
});

/* date */
registerCommand({
  name: "date",
  description: "show current date and time",
  handler: () => ({
    lines: [line(new Date().toString())],
  }),
});

/* uname */
registerCommand({
  name: "uname",
  description: "show system information",
  handler: () => ({
    lines: [line("BLACKSITE-07 CLASSIFIED NETWORK v0.1.0 x86_64")],
  }),
});

/* hostname */
registerCommand({
  name: "hostname",
  description: "show hostname",
  handler: () => ({
    lines: [line("BLACKSITE-07")],
  }),
});

/* uptime */
registerCommand({
  name: "uptime",
  description: "show system uptime",
  handler: () => {
    const days = Math.floor(Math.random() * 2000) + 500;
    const hours = Math.floor(Math.random() * 24);
    const mins = Math.floor(Math.random() * 60);
    return {
      lines: [
        line(`up ${days} days, ${hours}:${String(mins).padStart(2, "0")}, 1 user, load average: 0.00, 0.01, 0.00`),
      ],
    };
  },
});
