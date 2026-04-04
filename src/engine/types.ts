/* ── Types shared across the terminal engine ── */

export interface OutputLine {
  id: string;
  text: string;
  color?: string;       // tailwind text color class or CSS color
  delay?: number;       // ms delay before showing this line
  typed?: boolean;      // character-by-character typing effect
  typingSpeed?: number; // ms per character (default 20)
}

export interface CommandResult {
  lines: OutputLine[];
}

export type CommandHandler = (
  args: string[],
  rawInput: string,
) => CommandResult | Promise<CommandResult>;

export interface CommandDef {
  name: string;
  description: string;
  handler: CommandHandler;
}
