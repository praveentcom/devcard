/**
 * Process tables in markdown
 * @param content - The content to process
 * @returns The processed HTML
 */
function processTables(content: string): { content: string; tables: string[] } {
  const tables: string[] = [];
  const lines = content.split("\n");
  const result: string[] = [];
  let i = 0;

  /**
   * Process the tables
   */
  while (i < lines.length) {
    const line = lines[i];

    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      lines[i + 1].includes("|") &&
      lines[i + 1].includes("-")
    ) {
      const headerLine = line;
      const separatorLine = lines[i + 1];

      /**
       * Parse the headers for the table
       */
      const headers = headerLine
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell !== "");

      /**
       * Parse the alignment from the separator line
       */
      const alignments = separatorLine
        .split("|")
        .map((cell) => {
          const trimmed = cell.trim();
          if (trimmed.startsWith(":") && trimmed.endsWith(":")) return "center";
          if (trimmed.endsWith(":")) return "right";
          return "left";
        })
        .filter((_, index) => index < headers.length);

      /**
       * Start the table HTML construction
       */
      let tableHTML = '<div class="overflow-x-auto my-4">';
      tableHTML +=
        '<table class="min-w-full border border-border/75 rounded-sm">';

      /**
       * Append the headers to the table
       */
      tableHTML += '<thead class="bg-muted/30">';
      tableHTML += "<tr>";
      headers.forEach((header, index) => {
        const alignment = alignments[index] || "left";
        const textAlign =
          alignment === "center"
            ? "text-center"
            : alignment === "right"
              ? "text-right"
              : "text-left";
        tableHTML += `<th class="px-3 py-2 text-xs font-medium border-b border-border/75 ${textAlign}">${header}</th>`;
      });
      tableHTML += "</tr>";
      tableHTML += "</thead>";
      i += 2;

      /**
       * Append the body to the table
       */
      tableHTML += "<tbody>";
      while (i < lines.length && lines[i].includes("|")) {
        const rowLine = lines[i];
        const cells = rowLine
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell !== "");

        if (cells.length > 0) {
          tableHTML += '<tr class="border-b border-border/75 last:border-b-0">';
          cells.forEach((cell, index) => {
            const alignment = alignments[index] || "left";
            const textAlign =
              alignment === "center"
                ? "text-center"
                : alignment === "right"
                  ? "text-right"
                  : "text-left";
            tableHTML += `<td class="px-3 py-2 text-xs ${textAlign}">${cell}</td>`;
          });
          tableHTML += "</tr>";
        }
        i++;
      }

      tableHTML += "</tbody>";
      tableHTML += "</table>";
      tableHTML += "</div>";

      tables.push(tableHTML);
      result.push(
        `<table-placeholder-${tables.length - 1}></table-placeholder-${tables.length - 1}>`,
      );
    } else {
      result.push(line);
      i++;
    }
  }

  /**
   * Join the result array into a string
   */
  return { content: result.join("\n"), tables };
}

export default processTables;
