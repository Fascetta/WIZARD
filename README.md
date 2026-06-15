# WIZARD:<br>ROBOTIC POLICY ADAPTATION <br> via WEIGHT-SPACE META-LEARNING

[Visit the Project Website](https://Fascetta.github.io/WIZARD/)

## TL;DR

Standard VLA adaptation is bottlenecked by task-specific action labels and test-time optimization. WIZARD removes both: it generates LoRA weights directly from language and video evidence, then injects them into a frozen policy for zero-shot execution. WIZARD improves performance on unseen tasks by up to **14x** compared to standard methods.

---

## 🌟 Key Contributions

WIZARD introduces a novel paradigm for robotic policy adaptation:

* **Zero-Shot Adaptation in Weight-Space:** A new approach that generates task-specific weights directly, completely bypassing slow, gradient-based test-time fine-tuning.
* **The WIZARD Architecture:** A meta-network that conditions a frozen Vision-Language-Action (VLA) backbone with a dynamically generated LoRA adapter, all from just a language prompt and a single demonstration video.
* **Multimodal Design Principles:** Incorporates multimodal weight structuring, scale-aware generation, and alignment-oriented supervision in weight space to ensure stable, robust control.
* **Strong Empirical Performance:** Achieves state-of-the-art zero-shot results on the LIBERO benchmark, demonstrating significant gains in generalization and efficiency.

---

## 💡 The WIZARD Architecture

WIZARD re-frames robotic adaptation as a direct parameter inference problem. Instead of slow, gradient-based fine-tuning, it learns to map task evidence directly to the parameter delta (a LoRA adapter) needed to specialize a general policy. This is done in three stages:

1. **Build Task Experts:** Train LoRA experts for meta-train datasets (LIBERO-Goal, LIBERO-Object, LIBERO-10) on top of a frozen VLA backbone.
2. **Learn Weight Mapping:** Encode task evidence from prompt and demo video, then train a meta-network to reconstruct expert LoRA updates in weight space.
3. **Zero-Shot Inference:** Infer LoRA weights in one forward pass and inject them into the frozen policy, with **no action labels** and **no gradient updates**.

---

## 📊 Quantitative Results: Zero-Shot Generalization

We evaluate against MT-VLA fine-tuning under strict held-out distribution shifts. WIZARD consistently outperforms standard baselines, achieving significant gains on unseen task suites.

| Dataset | MT-VLA (pi0.5) Avg. | WIZARD Avg. | Delta |
| --- | --- | --- | --- |
| **LIBERO-Spatial** | 0.19 | **0.40** | +0.21 (~2.1x) |
| **LIBERO-Goal** | 0.14 | **0.22** | +0.08 (~1.6x) |
| **LIBERO-Object** | 0.01 | **0.03** | +0.02 (~3.0x) |
| **LIBERO-10** (A/B) | 0.03/0.03 | **0.09/0.07** | +0.06/+0.04 |

---

## 🤖 Real-World Deployment

Real deployment uses a 7-DoF Franka Emika Panda with an eye-in-hand Intel RealSense D415 and two external D405 cameras. WIZARD provides a ~14x gain on unseen tasks compared to MT-VLA baselines.

| Method | Banana | Apple | Marker | Cup | Apple→Cup | **Avg.** |
| --- | --- | --- | --- | --- | --- | --- |
| pi0.5 baseline | 0.27 | 0.13 | 0.10 | 0.30 | 0.07 | 0.17 |
| **WIZARD** | 0.53 | 0.33 | 0.17 | 0.63 | 0.17 | **0.33** |

---

## 🎬 Zero-Shot Rollout Demonstrations

Examples of WIZARD performing tasks zero-shot:

* **Spatial reasoning:** Bowl on stove to plate.
* **Object-centric transfer:** Orange juice to basket.
* **Goal-conditioned behavior:** Wine bottle to cabinet top.

---

## 💻 Code, Installation & Usage

[https://github.com/Fascetta/WIZARD](https://github.com/Fascetta/WIZARD)

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
