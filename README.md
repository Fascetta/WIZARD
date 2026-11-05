# WIZARD:<br>ROBOTIC POLICY ADAPTATION <br> via WEIGHT-SPACE META-LEARNING

**CoRL 2026 Workshop** · [Paper (arXiv:2606.07217)](https://arxiv.org/abs/2606.07217) · [Project Website](https://fascetta.github.io/WIZARD/)

## TL;DR

Standard VLA adaptation is bottlenecked by task-specific action labels and test-time optimization. WIZARD removes both: it generates LoRA weights directly from language and video evidence, then injects them into a frozen policy for zero-shot execution. On held-out LIBERO-Spatial tasks WIZARD reaches **40%** success (vs 19% for fine-tuned π0.5 and 28% for LoRA-Gen), and on a real Franka Emika Panda it raises average success from **17% to 37%**. It also leads on MetaWorld ML45 (66% vs 58% and 60%).

---

## 🌟 Key Contributions

WIZARD introduces a novel paradigm for robotic policy adaptation:

* **Zero-Shot Adaptation in Weight-Space:** A new approach that generates task-specific weights directly, completely bypassing slow, gradient-based test-time fine-tuning.
* **The WIZARD Architecture:** A meta-network that conditions a frozen Vision-Language-Action (VLA) backbone with a dynamically generated LoRA adapter, all from just a language prompt and a single demonstration video.
* **Multimodal Design Principles:** Incorporates multimodal weight structuring, scale-aware generation, and alignment-oriented supervision in weight space to ensure stable, robust control.
* **Strong Empirical Performance:** Outperforms nearest-neighbor retrieval, one-demonstration fine-tuning and LoRA-Gen on held-out LIBERO suites and MetaWorld ML45, and on a physical robot.

---

## 💡 The WIZARD Architecture

WIZARD re-frames robotic adaptation as a direct parameter inference problem. Instead of slow, gradient-based fine-tuning, it learns to map task evidence directly to the parameter delta (a LoRA adapter) needed to specialize a general policy. This is done in three stages:

1. **Build Task Experts:** Train a LoRA expert for every source task on top of a frozen π0.5 backbone; their trajectories are used only to provide weight-space targets.
2. **Learn Weight Mapping:** Encode a language instruction and a demonstration video (no action labels) with the frozen VLA encoder, then train a meta-network to reconstruct expert LoRA updates in weight space.
3. **Zero-Shot Inference:** Infer LoRA weights in one forward pass (about 0.07 s) and inject them into the frozen policy, with **no action labels** and **no gradient updates**.

---

## 📊 Quantitative Results: Zero-Shot Generalization

We evaluate under held-out task distributions: each LIBERO suite is held out in turn (50 rollouts per task), and MetaWorld ML45 uses 45 source tasks and 5 held-out tasks. Baselines are pretrained π0.5, nearest-neighbor (NN) adapter retrieval, one-demonstration fine-tuned π0.5 (action-labeled) and LoRA-Gen. WIZARD uses the same demonstration without its action labels. Pretrained π0.5 scores 0% on all LIBERO suites.

| Dataset | NN retrieval | Fine-tuned π0.5 | LoRA-Gen | WIZARD | Delta vs fine-tuned |
| --- | --- | --- | --- | --- | --- |
| **LIBERO-Spatial** | 0.02 | 0.19 | 0.28 | **0.40** | +0.21 (~2.1x) |
| **LIBERO-Goal** | 0.02 | 0.14 | 0.17 | **0.22** | +0.08 (~1.6x) |
| **LIBERO-Object** | 0.00 | 0.01 | 0.01 | **0.03** | +0.02 (~3.0x) |
| **LIBERO-10** (part 1/2) | ≤0.01 | 0.03/0.03 | 0.05/0.04 | **0.09/0.07** | +0.06/+0.04 |
| **MetaWorld ML45** | 0.44 | 0.58 | 0.60 | **0.66** | +0.08 |

---

## 🤖 Real-World Deployment

Real deployment uses a 7-DoF Franka Emika Panda with an eye-in-hand Intel RealSense D415 and two external D405 cameras. Both methods start from the same DROID-pretrained π0.5 checkpoint. One task is held out and the other four serve as source tasks; results are over 30 rollouts per task.

| Method | Banana | Apple | Marker | Cup | Apple→Cup | **Avg.** |
| --- | --- | --- | --- | --- | --- | --- |
| Fine-tuned π0.5 | 0.27 | 0.13 | 0.10 | 0.30 | 0.07 | 0.17 |
| **WIZARD** | 0.53 | 0.33 | 0.17 | 0.63 | 0.17 | **0.37** |

---

## 🔬 Analysis

* **Supervision efficiency:** on LIBERO-Spatial Task 1, WIZARD reaches 90% from one unlabeled demonstration, while fine-tuning needs about 25 action-labeled demonstrations.
* **Warm start:** on Task 10, initializing from the generated adapter reaches the 96% expert level after 70 fine-tuning steps vs 90 from the standard initialization.
* **Task conditioning:** language-only 0%, vision-only 25%, both 40%; the frozen VLA representation (40%) beats Gemma and Qwen embeddings (0%).
* **Generation cost:** a 46.1M-parameter rank-16 adapter (1.27% of π0.5) in about 0.07 s and 1.74 GB on an A6000.

---

## 🎬 Zero-Shot Rollout Demonstrations

Examples of WIZARD performing tasks zero-shot:

* **Spatial reasoning:** Bowl on stove to plate.
* **Object-centric transfer:** Orange juice to basket.
* **Goal-conditioned behavior:** Wine bottle to cabinet top.

---

## 💻 Code, Installation & Usage

The code is being prepared for release. This repository currently hosts the [project website](https://fascetta.github.io/WIZARD/).

---

## 📝 Citation

If you find WIZARD useful in your research, please consider citing our work:

```bibtex
@misc{bianchi2026roboticpolicyadaptationweightspace,
  title={Robotic Policy Adaptation via Weight-Space Meta-Learning},
  author={Christian Bianchi and Siamak Yousefi and Alessio Sampieri and Andrea Roberti and Luca Rigazio and Fabio Galasso and Luca Franco},
  year={2026},
  eprint={2606.07217},
  archivePrefix={arXiv},
  primaryClass={cs.RO}
}

```
