import { Injectable } from "@nestjs/common";

@Injectable()
export class AiService {
  async summarizePost(content: string): Promise<{ summary: string }> {
    const snippet =
      content.length > 180 ? `${content.slice(0, 180)}...` : content;
    return { summary: `AI Summary: ${snippet}` };
  }

  async generateMedicalPost(topic: string): Promise<{ content: string }> {
    return {
      content: `Evidence-based update on ${topic}: include guideline references, patient-safe language, and clear disclosures.`,
    };
  }
}
