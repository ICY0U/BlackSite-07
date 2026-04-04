import { CommandDef, CommandResult, OutputLine } from "./types";

let nextId = 0;
export function lineId(): string {
  return `ln-${++nextId}-${Date.now()}`;
}

export function line(
  text: string,
  opts?: Partial<Omit<OutputLine, "id" | "text">>,
): OutputLine {
  return { id: lineId(), text, ...opts };
}

/* ── Registry ── */

const commands = new Map<string, CommandDef>();

export function registerCommand(def: CommandDef) {
  commands.set(def.name.toLowerCase(), def);
}

export function getCommand(name: string): CommandDef | undefined {
  return commands.get(name.toLowerCase());
}

export function getAllCommands(): CommandDef[] {
  return Array.from(commands.values());
}

/* ── Parser ── */

export function parseInput(raw: string): { command: string; args: string[] } {
  const trimmed = raw.trim();
  if (!trimmed) return { command: "", args: [] };
  const parts = trimmed.split(/\s+/);
  return { command: parts[0].toLowerCase(), args: parts.slice(1) };
}

/* ── Execute ── */

export async function executeCommand(raw: string): Promise<CommandResult> {
  const { command, args } = parseInput(raw);

  if (!command) {
    return { lines: [] };
  }

  const def = getCommand(command);
  if (!def) {
    return {
      lines: [
        line(`command not found: ${command}`, { color: "text-term-error" }),
      ],
    };
  }

  return def.handler(args, raw);
}
