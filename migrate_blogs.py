#!/usr/bin/env python3
"""
Migrate 55 blogs from nosana.com → nosana-new

Usage: python3 migrate_blogs.py
"""

import os
import re
import shutil
from pathlib import Path

# Paths
NOSANA_COM = Path("/home/ninjafire/Workspace/others/nosana.com")
NOSANA_NEW = Path("/home/ninjafire/Workspace/others/nosana-new")
SRC_BLOG = NOSANA_COM / "content/blog"
SRC_IMG = NOSANA_COM / "static/img"
DEST_BLOGS = NOSANA_NEW / "src/content/blogs"
FALLBACK_IMG = NOSANA_NEW / "public/og/blog.png"

# The 55 blogs to migrate: (source_file, slug, thumbnail_src)
# thumbnail_src is relative to SRC_IMG
BLOGS = [
    ("ai_dev.md",
     "ai-dev-open-source-genai-ml-summit-europe-august-28-29-2025",
     "AIDev.jpg"),
    ("an_indepth_exploration_of_ai_inference_from_concept_to_real_world_applications.md",
     "an-in-depth-exploration-of-ai-inference-from-concept-to-real-world-applications",
     "know_inference.png"),
    ("asian_expansion.md",
     "nosana-expands-across-asia-powering-the-future-of-ai-infrastructure",
     "asian_expansion.png"),
    ("breakpoint-2023-bridging-the-global-gpu-shortage.md",
     "breakpoint-2023-bridging-the-global-gpu-shortage",
     "breakpointbanner.png"),
    ("breakpoint_2025.md",
     "solana-breakpoint-2025-december-11-13-2025",
     "bp25.png"),
    ("buidl_day.md",
     "buidl-day-token2049-september-30-2025",
     "buidlday.png"),
    ("deep_learning_demystified.md",
     "deep-learning-demystified",
     "deep_learning1.png"),
    ("deep_learning_unveiled_navigating_training_inference_and_the_gpu_shortage_dilemma.md",
     "deep-learning-unveiled-navigating-training-inference-and-the-gpu-shortage-dilemma",
     "learning_inference.png"),
    ("deployment_manager_1.md",
     "elevating-the-deployment-experience-introducing-nosanas-new-deployment-manager",
     "NosanaDeploymentManagerBlog.jpg"),
    ("deployment_manager_2.md",
     "visual-command-center-managing-deployments-with-nosanas-dashboard",
     "NosanaDeploymentManagerBlog2.jpg"),
    ("dutch_blockhain_week.md",
     "dutch-blockchain-week-may-2025",
     "DutchBlockchainBlog.jpg"),
    ("exploring_the_distinctions_between_gpuss_and_cpus.md",
     "exploring-the-distinctions-between-gpus-and-cpus",
     "gpuvscpu.png"),
    ("folding-at-home.md",
     "nosanas-spare-gpu-capacity-is-now-powering-scientific-research",
     "folding-at-home.png"),
    ("grants_announcement.md",
     "the-nosana-grants-program-fueling-the-next-wave-of-ai-builders-vibers-and-dreamers",
     "Nosana_Grants_Announcement_Banner.png"),
    ("how_ai_inference_drives_business_applications_in_2024.md",
     "how-ai-inference-drives-business-applications-in-2024",
     "use_cases.png"),
    ("how-to-monetize-your-hardware-with-nosana.md",
     "unlock-the-earning-potential-of-your-gpu-how-to-monetize-your-hardware-with-nosana",
     "nosana_hardware.png"),
    ("january_on_nosana.md",
     "january-on-nosana-milestones-momentum-whats-next",
     "december_2025_recap/monthly_newsletter.png"),
    ("llm_benchmarking_on_the_nosana_grid.md",
     "llm-benchmarking-on-the-nosana-grid",
     "LLM-Benchmarking-blog03.jpg"),
    ("navigating-a-sustainable-future-in-tech-the-nosana-initiative.md",
     "navigating-a-sustainable-future-in-tech-the-nosana-initiative",
     "sustainable_computing.png"),
    ("new-direction-ai-inference.md",
     "nosanas-new-direction-ai-inference",
     "browser_node.png"),
    ("newsletter-october-2025.md",
     "nosana-monthly-october-edition",
     "newsletter-october-2025.png"),
    ("nosana_2023_pioneering_the_future_of_ai_and_gpu_computing.md",
     "nosana-2023-pioneering-ai-and-gpu-computing",
     "2023.png"),
    ("nosana_alio.md",
     "alio-uses-nosana-gpu-cloud-to-secure-agentic-llms-at-scale",
     "alio_nosana.png"),
    ("nosana_and_aurory_partner_to_create_unique_ai_powered_gaming_experiences.md",
     "nosana-and-aurory-partner-to-create-unique-ai-powered-gaming-experiences",
     "NosanaXAuroryBlog.jpg"),
    ("nosana_at_solana_hacker_house_dubai_2024.md",
     "nosana-at-solana-hacker-house-dubai-2024",
     "hackerhouse2024.jpg"),
    ("nosana_kit.md",
     "introducing-nosana-kit-the-comprehensive-2-0-toolchain-for-nosana",
     "NosanaKit.jpg"),
    ("nosana-launches-incentivized-public-test-grid-with-3-million-nos.md",
     "nosana-launches-incentivized-public-test-grid-with-3-million-nos",
     "itg2.png"),
    ("nosana_monthly_november.md",
     "nosana-monthly-november-edition",
     "newsletter-october-2025.png"),
    ("nosana-nos-raydium-rewards-farm.md",
     "nosanas-nos-rewards-farm-on-raydium",
     "nos_raydium.png"),
    ("nosana_partners_with_alphaneural_to_democratize_ai_model_development.md",
     "nosana-partners-with-alphaneural-to-democratize-ai-model-development",
     "NosanaXAlphaBlog.jpg"),
    ("nosana_partners_with_matrix_one_to_power_the_future_of_ai_avatars.md",
     "nosana-partners-with-matrix-one-to-power-the-future-of-ai-avatars",
     "NosanaXMatrixBlog.jpg"),
    ("nosana_partners_with_sogni_ai_to_empower_creativity_through_ai_powered_art_generation.md",
     "nosana-partners-with-sogni-ai-to-empower-creativity-through-ai-powered-art-generation",
     "NosanaSogniBlog.jpg"),
    ("nosana_partners_with_theoriq_to_foster_frictionless_ai_innovation.md",
     "nosana-partners-with-theoriq-to-foster-frictionless-ai-innovation",
     "theoriq_blog.jpg"),
    ("nosana_staking_program_update.md",
     "nosana-staking-program-update",
     "staking_update.jpg"),
    ("nosana_swapping_priority_fees.md",
     "introducing-swapping-and-priority-fees",
     "NosanaSwapBlog1050x630.jpg"),
    ("nosana_team_heading_to_singapore_for_solana_breakpoint_and_token2049.md",
     "nosana-team-is-heading-to-singapore-for-solana-breakpoint-and-token2049",
     "NosanaBreakpoint2024Blog.jpg"),
    ("nosana_teams_up_with_piknik_to_integrate_high_performance_gpus_into_its_depin_network.md",
     "nosana-teams-up-with-piknik-to-integrate-high-performance-gpus-into-its-depin-network",
     "NosanaPiKNiKBlog.jpg"),
    ("nosanas_gpu_marketplace_is_open_to_the_public.md",
     "nosanas-gpu-marketplace-is-open-to-the-public",
     "Nosana2025Blog1050x630.jpg"),
    ("nosanas_strategic_apy_adjustment_for_balanced_growth_and_stability.md",
     "nosanas-strategic-apy-adjustment-for-balanced-growth-and-stability",
     "adjustment.png"),
    ("nos_challenge.md",
     "builders-challenge-create-a-nosana-template",
     "nosana_builders_challenge.jpg"),
    ("nosvember.md",
     "nosvember-games-a-month-of-celebration-for-the-nosana-community",
     "nosvember.png"),
    ("nosvember_recap.md",
     "the-heart-of-nosana-nosvember-2025-recap",
     "nosvember-recap.jpg"),
    ("ocada_uses_nosana_to_power_its_ai_agents_on_solana_transforming_blockchain_user_experience.md",
     "ocada-uses-nosana-to-power-its-ai-agents-on-solana-transforming-blockchain-user-experience",
     "NosanaOcada2Blog.jpg"),
    ("road_to_mainnet_nosanas_next_chapter.md",
     "road-to-mainnet-nosanas-next-chapter",
     "mainnet_blog.jpg"),
    ("start_up_economics.md",
     "how-were-helping-ai-startups-cut-costs-by-67-with-open-source-models",
     "NosanaArticleScalingAIBlog.jpg"),
    ("super_ai.md",
     "superai-june-18-19-2025",
     "SuperAI.jpg"),
    ("test-grid-phase-1-accelerating-the-ai-and-gpu-computing-revolution.md",
     "test-grid-phase-1-accelerating-the-ai-and-gpu-computing-revolution",
     "registration.png"),
    ("test_grid_phase_2_update.md",
     "test-grid-phase-2-update",
     "phase2_update.jpg"),
    ("test_grid_phase_3_final_steps_to_mainnet.md",
     "test-grid-phase-3-final-steps-to-mainnet",
     "phase3.png"),
    ("testing-the-first-gpu-grid-for-ai-inference.md",
     "testing-the-first-gpu-grid-for-ai-inference",
     "test-grid-blog-banner.png"),
    ("tokenomics-proposal.md",
     "from-yield-to-growth-aligning-nos-rewards-with-real-usage",
     "tokenomics.png"),
    ("voting.md",
     "from-proposal-to-vote-how-nnp-0001-will-be-decided",
     "voting.png"),
    ("waib_summit.md",
     "waib-summit-june-27-28-2025",
     "waib.png"),
    ("we_are_developers.md",
     "wearedevelopers-world-congress-july-9-11-2025",
     "WeAreDevelopers.jpg"),
    ("wrapped_2025.md",
     "nosana-2025-from-testnets-to-real-world-compute",
     "2025_wrapped.png"),
]


def parse_frontmatter(content: str):
    """Parse YAML frontmatter from markdown content.
    Returns (frontmatter_dict, body) where frontmatter_dict has raw string values."""
    if not content.startswith("---"):
        return {}, content

    end = content.find("\n---", 3)
    if end == -1:
        # No closing ---, treat entire content after opening --- as frontmatter
        fm_text = content[3:].strip()
        body = ""
    else:
        fm_text = content[3:end].strip()
        body = content[end + 4:].lstrip("\n")

    # Simple YAML parser for our known fields
    fm = {}
    # Handle multi-line description
    lines = fm_text.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]
        if ":" in line:
            key, _, val = line.partition(":")
            key = key.strip()
            val = val.strip()

            # Check if it's a list (next lines start with "  -")
            if val == "" and i + 1 < len(lines) and lines[i + 1].strip().startswith("-"):
                items = []
                i += 1
                while i < len(lines) and lines[i].strip().startswith("-"):
                    item = lines[i].strip().lstrip("- ").strip()
                    # Remove surrounding quotes
                    if (item.startswith('"') and item.endswith('"')) or \
                       (item.startswith("'") and item.endswith("'")):
                        item = item[1:-1]
                    items.append(item)
                    i += 1
                fm[key] = items
                continue
            else:
                # Remove surrounding quotes
                if (val.startswith('"') and val.endswith('"')) or \
                   (val.startswith("'") and val.endswith("'")):
                    val = val[1:-1]
                fm[key] = val
        i += 1

    return fm, body


def copy_image(src_path: Path, dest_dir: Path) -> str:
    """Copy image to assets dir. Returns filename used."""
    if src_path.exists():
        dest = dest_dir / src_path.name
        shutil.copy2(src_path, dest)
        return src_path.name
    else:
        # Use fallback
        dest = dest_dir / "thumbnail.png"
        shutil.copy2(FALLBACK_IMG, dest)
        print(f"  ⚠ Missing image {src_path.name}, using fallback thumbnail.png")
        return "thumbnail.png"


def find_image_with_fallback_ext(src: Path) -> Path | None:
    """Try to find image, checking alternate extensions if exact path missing."""
    if src.exists():
        return src
    # Try alternate extensions
    alt_exts = {'.jpg': '.jpeg', '.jpeg': '.jpg', '.png': '.PNG', '.PNG': '.png'}
    stem = src.stem
    alt = alt_exts.get(src.suffix.lower())
    if alt:
        candidate = src.with_name(stem + alt)
        if candidate.exists():
            return candidate
    return None


def process_inline_images(body: str, assets_dir: Path) -> str:
    """Find all /img/... references in body, copy files, rewrite paths."""
    # Match ![alt](/img/path) patterns
    pattern = re.compile(r'!\[([^\]]*)\]\(/img/([^)]+)\)')

    def replace_img(m):
        alt = m.group(1)
        img_path = m.group(2)  # e.g. "dm_ui/template.png" or "foo.png"

        src = SRC_IMG / img_path
        # Copy flat into assets (strip subdirectory)
        orig_filename = Path(img_path).name

        found = find_image_with_fallback_ext(src)
        if found:
            # Use the actual filename from disk (correct extension)
            actual_filename = found.name
            dest = assets_dir / actual_filename
            shutil.copy2(found, dest)
            return f"![{alt}](./assets/{actual_filename})"
        else:
            print(f"  ⚠ Inline image not found: {img_path}")
            return f"![{alt}](./assets/{orig_filename})"

    return pattern.sub(replace_img, body)


def format_tags(tags):
    if not tags:
        return ""
    lines = ["tags:"]
    for tag in tags:
        lines.append(f'  - "{tag}"')
    return "\n".join(lines)


def escape_yaml_string(s: str) -> str:
    """Escape a string for YAML double-quoted value."""
    return s.replace('\\', '\\\\').replace('"', '\\"')


def migrate_blog(src_file: str, slug: str, thumbnail_src: str):
    print(f"\n→ Migrating: {src_file} → {slug}")

    # Read source
    src_path = SRC_BLOG / src_file
    if not src_path.exists():
        print(f"  ✗ Source file not found: {src_path}")
        return

    content = src_path.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(content)

    # Create destination dirs
    dest_dir = DEST_BLOGS / slug
    assets_dir = dest_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)

    # Copy thumbnail
    thumb_path = SRC_IMG / thumbnail_src
    if thumb_path.exists():
        # Flat copy (strip subdirectory)
        thumb_filename = Path(thumbnail_src).name
        dest_thumb = assets_dir / thumb_filename
        shutil.copy2(thumb_path, dest_thumb)
        thumb_ref = f"./assets/{thumb_filename}"
    else:
        # Fallback
        dest_thumb = assets_dir / "thumbnail.png"
        shutil.copy2(FALLBACK_IMG, dest_thumb)
        thumb_ref = "./assets/thumbnail.png"
        print(f"  ⚠ Thumbnail not found: {thumb_path}, using fallback")

    # Process inline images in body
    body = process_inline_images(body, assets_dir)

    # Build frontmatter
    title = fm.get("title", "")
    description = fm.get("description", "")
    created_at = fm.get("createdAt", "")
    tags = fm.get("tags", [])
    if isinstance(tags, str):
        tags = [tags]

    # Build output
    out_lines = ["---"]
    out_lines.append('category: "blog"')
    out_lines.append(f'title: "{escape_yaml_string(title)}"')
    out_lines.append(f'description: "{escape_yaml_string(description)}"')
    out_lines.append(f'thumbnail: "{thumb_ref}"')
    out_lines.append(f'createdAt: "{created_at}"')
    if tags:
        out_lines.append("tags:")
        for tag in tags:
            out_lines.append(f'  - "{tag}"')
    out_lines.append("---")
    out_lines.append("")
    out_lines.append(body.rstrip())
    out_lines.append("")

    output = "\n".join(out_lines)

    dest_index = dest_dir / "index.md"
    dest_index.write_text(output, encoding="utf-8")
    print(f"  ✓ Written {dest_index}")


def main():
    print(f"Starting migration of {len(BLOGS)} blogs...")
    print(f"Source: {SRC_BLOG}")
    print(f"Destination: {DEST_BLOGS}")

    errors = []
    for src_file, slug, thumbnail_src in BLOGS:
        try:
            migrate_blog(src_file, slug, thumbnail_src)
        except Exception as e:
            print(f"  ✗ ERROR: {e}")
            errors.append((src_file, str(e)))

    print(f"\n{'='*60}")
    print(f"Done! {len(BLOGS) - len(errors)}/{len(BLOGS)} blogs migrated successfully.")
    if errors:
        print("Errors:")
        for f, e in errors:
            print(f"  - {f}: {e}")


if __name__ == "__main__":
    main()
