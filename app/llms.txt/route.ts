import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://devtest512.info';

export async function GET() {
  const posts = getAllPosts();

  const blogPostLines = posts
    .map((post) => `- [${post.title}](${BASE_URL}/blog/${post.slug}): ${post.excerpt}`)
    .join('\n');

  const content = `# Randy DeRego

> Systems Administrator with 10 years of experience in infrastructure management, automation, and IT operations. Based in Austin, TX.

## About

Randy DeRego is a highly skilled Systems Administrator specializing in virtualized environments, cloud platforms, PowerShell/Bash automation, and enterprise identity management. He has worked with organizations ranging from managed service providers to Fortune 500 contractors, building automation tools, managing Microsoft 365 and Azure tenants, and leading day-to-day IT operations.

## Pages

- [Portfolio & Resume](${BASE_URL}): Main portfolio with work history, skills, certifications, and contact information.
- [Blog](${BASE_URL}/blog): Technical articles on systems administration, automation, AI in IT, and cloud operations.
- [AZ-104 Study Notes](${BASE_URL}/az104): Azure Administrator certification study materials.

## Blog Posts

${blogPostLines}

## Skills & Expertise

- Virtualization: VMware ESXi, Hyper-V, vSphere
- Cloud: Microsoft Azure, AWS
- Identity & Directory: Active Directory, Group Policy, Microsoft 365, Exchange
- Networking: TCP/IP, DNS, DHCP, VLANs, VPN, Cisco switches
- Scripting & Development: PowerShell, Bash, Python, SQL
- RMM & Operations: NinjaOneRMM, Patch Management, IT Automation
- AI & Local LLMs: AI Studio, LM Studio, VLLM, Ollama

## Work History

- Systems Administrator — The Solutions Team (Dec 2025–Mar 2026)
- Systems Administrator — TeamLogic IT (Nov 2021–Sep 2025)
- Help Desk / Network Technician — Samsung (Jan 2019–Nov 2021)
- Tech Support — Eagle Eye Networks (Feb 2017–Jan 2019)

## Education & Certifications

- B.S. Computer Science — Western Governors University
- CompTIA A+

## Contact

- Email: rderego@devtest512.info
- Location: Austin, TX
- GitHub: https://github.com/killo431
- LinkedIn: https://www.linkedin.com/in/randysderego/
- Indeed: https://profile.indeed.com/p/randyd-mh1efpj
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
