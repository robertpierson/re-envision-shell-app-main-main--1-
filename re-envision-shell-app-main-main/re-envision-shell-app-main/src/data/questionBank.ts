// Question bank — 725 questions across 96 lessons, graded and ramped.
//
// easy   the lesson's own vocabulary (a sentence with its key term blanked) and
//        plain true/false items.
// medium key-takeaway recall, with distractors drawn from other lessons.
// hard   the curriculum's own quiz items: code, shapes, arithmetic, bug fixes.
//
// Every lesson opens easy and works up. Units 1-3 of any course, and lesson 1
// of every unit, allow at most one hard item, so nobody meets a tensor-shape
// question before they have read about tensors. Regenerate rather than edit.
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  stem: string;
  choices: string[];
  correct: number;
  explain: string;
  difficulty: Difficulty;
}

/** Keyed by `<lessonId>#lesson-<n>`. */
export const lessonBank: Record<string, QuizQuestion[]> = {
  "course-1-deep-learning/unit1#lesson-1": [
    {
      "stem": "The perceptron learning rule updates the weight vector on every training example, whether or not the current prediction is correct.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. The update is w ← w + η(y − ŷ)x . When the prediction is already correct, y − ŷ = 0 , and the update term vanishes — the weights are left unchanged. Updates only happen on misclassified examples. It's tempting to think every layer of \"training\" must touch every example equally, since that's how some other model-fitting procedures work, but the perceptron rule is specifically mistake",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A perceptron holds one weight per input feature, w = [w1, w2] , plus a single scalar _____ , b .",
      "choices": [
        "activation function",
        "bias",
        "hyperplane",
        "Huber loss"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “bias”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: It computes a weighted sum of the inputs — the _____ — and adds the bias:",
      "choices": [
        "Padding",
        "dot product",
        "loss curve",
        "backpropagation through time"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “dot product”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The perceptron turns it into a decision with the _____ : predict class 1 if z ≥ 0 , else predict class 0.",
      "choices": [
        "Same padding",
        "step function",
        "multi-layer perceptron",
        "batch normalization"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “step function”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The perceptron and the linear decision boundary\" teaches?",
      "choices": [
        "Momentum's velocity buffer cancels alternating-sign noise and accumulates consistent-sign signal, which is exactly the structure of oscillate-on-steep, drift-on-shallow.",
        "A perceptron computes w·x + b and thresholds it at zero — the weights encode feature importance and direction, the bias shifts the boundary off the origin.",
        "The shape contract is (batch, in_features) @ (in_features, units) → (batch, units) — the weight matrix's shape never depends on batch size, only on feature counts.",
        "Gradient clipping treats the symptom of explosion, not the cause ; it keeps training numerically stable but does nothing for vanishing, which needs an architectural fix."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The perceptron and the linear decision boundary\" teaches?",
      "choices": [
        "Sample weighting generalizes class weighting to per-row control — down-weight bad sensor data, up-weight the hours you most need right.",
        "The decision boundary is always a hyperplane — a straight line in 2D, a flat plane in 3D, and so on — regardless of how the weights are tuned.",
        "Channels-in tells you how deep one filter reaches into the input volume; channels-out tells you how many independently learned filters a layer applies, each producing its own feature map.",
        "Check the initial loss against ln(num_classes) before anything else — a flat loss at that exact value means zero learning signal, not slow learning, and points you at the forward pass or labels, not the optimizer."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The perceptron and the linear decision boundary\" teaches?",
      "choices": [
        "On a shared cluster, a debugging protocol is a budget decision : a ten-minute batch-overfit test is cheaper than an hour-long run repeated five times with no diagnosis.",
        "The learning rule only updates on mistakes : w ← w + η(y − ŷ)x , which is why training halts automatically once every point is correctly classified.",
        "Binary cross-entropy punishes confidently wrong probability predictions with unbounded loss — a critical property for a rare, costly event like a peak-demand trip.",
        "A small, hand-checkable example (two inputs, two hidden units, three classes) exercises the exact same mechanism as the full 256-input, 10-class network, just at a size a calculator can verify."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A perceptron is trained on mean_radius and mean_texture to separate malignant from benign nuclei. What shape can its decision boundary take?",
      "choices": [
        "Any smooth curve that best fits the data",
        "A straight line only",
        "A step function with multiple thresholds",
        "A circle centered on the class mean"
      ],
      "correct": 1,
      "explain": "The decision rule is w·x + b ≥ 0 , and the boundary where that expression equals zero is, in two dimensions, exactly a straight line. In higher dimensions it generalizes to a flat hyperplane — never a curve. A is wrong because \"best fits the data\" implies the model can bend to match the data's shape; a perceptron's boundary is fixed to be linear regardless of how well or poorly that fits the true ",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit1#lesson-2": [
    {
      "stem": "Fill the blank: An _____ is a fixed, elementwise nonlinear function applied to the output of a linear layer before that output is passed to the next layer.",
      "choices": [
        "activation function",
        "Padding",
        "GPU memory",
        "ReLU"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “activation function”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ function, σ(z) = 1 / (1 + e^-z) , squashes any real input into (0, 1) and was the default choice through the 1980s and 1990s because its output reads like a probability and its derivative has a clean closed form, σ(z)·(1 − σ(z)) .",
      "choices": [
        "1×1 convolution",
        "sigmoid",
        "Mixup",
        "Cosine annealing"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “sigmoid”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Its problem is _____ : for |z| > ~4 , the curve is nearly flat, so the derivative shrinks toward zero.",
      "choices": [
        "hyperplane",
        "hidden layer",
        "saturation",
        "max pooling"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “saturation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: In a network with several hidden layers, chaining several near-zero derivatives together during backpropagation makes earlier layers receive a vanishingly small learning signal — the _____ problem.",
      "choices": [
        "Width",
        "dot product",
        "output gate",
        "vanishing gradient"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “vanishing gradient”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Activation functions and why nonlinearity is the whole point\" teaches?",
      "choices": [
        "A small, hand-checkable example (two inputs, two hidden units, three classes) exercises the exact same mechanism as the full 256-input, 10-class network, just at a size a calculator can verify.",
        "Global average pooling replaces flatten+dense heads, cutting a would-be multi-million-parameter final layer down to zero-parameter pooling plus one small linear layer.",
        "Gradient accumulation fakes a larger batch without more peak activation memory ; activation checkpointing trades ~20–30% more compute for a large activation-memory reduction.",
        "Stacked linear layers collapse to one linear layer — W2(W1x+b1)+b2 always simplifies to a single W'x+b' , so nonlinearity is what makes depth meaningful, not optional decoration."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Activation functions and why nonlinearity is the whole point\" teaches?",
      "choices": [
        "SMOTE manufactures synthetic minority rows by interpolating real defaulters' features , which can create bureau-attribute combinations no real applicant would have, and does nothing to address training-vs-scoring vintage shift.",
        "Sigmoid and tanh saturate on both tails , driving gradients toward zero and slowing or stalling learning in deeper stacks; ReLU saturates only on the negative side , and can go fully dead there.",
        "Equivariance ≠ invariance: shifting the input shifts a conv layer's output correspondingly (equivariant); the output staying the same regardless of position (invariant) only emerges after pooling/global-aggregation is stacked on t",
        "MSE squares errors and lets large misses (like a missed demand spike) dominate; MAE treats all error sizes proportionally and is robust to sensor-glitch outliers; Huber blends both, quadratic near zero and linear past a threshold "
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Complete the ReLU derivative function so that it correctly reports a zero gradient exactly where ReLU is flat.",
      "choices": [
        "np.ones_like(z)",
        "(z > 0).astype(float)",
        "np.maximum(0, z)",
        "1 / (1 + np.exp(-z))"
      ],
      "correct": 1,
      "explain": "ReLU's derivative is 1 wherever the pre-activation z is positive and 0 wherever it's negative (undefined exactly at zero, conventionally taken as 0 or 1). (z > 0).astype(float) produces exactly that array of 1s and 0s. C, np.maximum(0, z) , is ReLU itself, not its derivative — a common mix-up when writing both functions quickly. D is the sigmoid function, unrelated to ReLU's derivative and never z",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit1#lesson-3": [
    {
      "stem": "Fill the blank: The output h is called a _____ when it feeds into further layers rather than being the network's final answer.",
      "choices": [
        "saturation",
        "hidden layer",
        "unroll",
        "hidden state"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “hidden layer”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Stack several of these — h1 = f(W1·x + b1) , then h2 = f(W2·h1 + b2) , then a final output layer — and you have a _____ (MLP), the plain \"fully connected\" network that everything more elaborate in this course builds on.",
      "choices": [
        "step",
        "multi-layer perceptron",
        "Huber loss",
        "batched forward propagation"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “multi-layer perceptron”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: In practice you never push one patient through the network at a time; you push a _____ of samples together as a matrix, because matrix multiplication over a batch is dramatically faster than a Python loop over individual rows.",
      "choices": [
        "output gate",
        "batch",
        "Reverse-mode",
        "Width"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “batch”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ — more units per layer — gives a layer more of these learned feature-combinations to work with in parallel.",
      "choices": [
        "batch",
        "output gate",
        "Mixup",
        "Width"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Width”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Layers, width, and depth: stacking into a network\" teaches?",
      "choices": [
        "A layer is f(W·x + b) — an affine transform followed by a fixed activation — and stacking these is the entire definition of a multi-layer perceptron.",
        "The output-size formula floor((H + 2P − K)/S) + 1 lets you check every layer's shape by hand — treat a shape mismatch as an arithmetic bug to find, not a mystery to debug by trial and error.",
        "Channels-in tells you how deep one filter reaches into the input volume; channels-out tells you how many independently learned filters a layer applies, each producing its own feature map.",
        "Sigmoid and tanh saturate on both tails , driving gradients toward zero and slowing or stalling learning in deeper stacks; ReLU saturates only on the negative side , and can go fully dead there."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Layers, width, and depth: stacking into a network\" teaches?",
      "choices": [
        "Shapes carry a batch dimension and a feature dimension ; a layer's weight matrix shape is (n_in, n_out) , and getting an axis wrong produces either a crash or, worse, a silent broadcast that computes garbage.",
        "Layer norm normalizes per example, not per batch , giving it no batch-size dependence and identical train/eval behavior — a safer default when minibatches are small or skewed by class-imbalance resampling.",
        "A loss function is just \"prediction + truth → one number,\" but which number depends entirely on which errors you want to punish harder.",
        "Ill-conditioning is a ratio, not a size. A large condition number κ means the stability constraint on the steep direction and the progress rate on the shallow direction pull the single SGD learning rate in opposite directions — th"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Why does stacking three linear layers with no activation function between them fail to add any representational power over a single linear layer?",
      "choices": [
        "Because linear layers cannot be trained with gradient descent",
        "Because the composition of affine maps is itself always a single affine map",
        "Because three layers always overfit a small clinical dataset",
        "Because linear layers require an odd number of hidden units"
      ],
      "correct": 1,
      "explain": "W2(W1x + b1) + b2 algebraically simplifies to (W2W1)x + (W2b1 + b2) , which has the same form as a single layer's W'x + b' . This holds for any number of stacked linear layers — the collapse is exact, not approximate. A is wrong: linear layers train fine with gradient descent on their own (that's ordinary linear regression via gradient descent) — the issue here is representational power, not train",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit2#lesson-1": [
    {
      "stem": "A bias vector for a layer with 16 hidden units should have shape (64, 16) so that it can be added directly to a batch of 64 pre-activations without broadcasting.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. The bias should be shape (16,) — one value per hidden unit, independent of batch size. Broadcasting is exactly the mechanism that lets a (16,) vector add correctly to a (64, 16) matrix without ever materializing a (64, 16) copy of the bias. Giving the bias a batch dimension would mean it has to be re-shaped every time the batch size changes, defeating the point of the batch-independ",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: This block of 64 hours is a _____ , and running it through the network in one shot is batched forward propagation .",
      "choices": [
        "Stride",
        "step",
        "LR range test",
        "batch"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “batch”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: This block of 64 hours is a batch , and running it through the network in one shot is _____ .",
      "choices": [
        "skip connection",
        "reduce",
        "GPU memory",
        "batched forward propagation"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “batched forward propagation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is the rule that lets NumPy add a (16,) vector to a (64, 16) matrix without you writing a loop: it treats the vector as if it were copied down all 64 rows, so b[j] gets added to every entry in column j .",
      "choices": [
        "local gradient",
        "ordered debugging protocol",
        "Broadcasting",
        "Seq-to-one"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Broadcasting”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The forward pass as composed matrix operations\" teaches?",
      "choices": [
        "β sets an effective averaging window of about 1/(1-β) steps — 10 steps at β=0.9, 100 at β=0.99 — and a bigger window trades faster shallow-direction progress for slower reaction to genuine changes in descent direction, like a gait",
        "Exclude biases and norm scale/shift parameters from weight decay — decaying them distorts the model's operating point and predicted-probability calibration, which matters directly when a regulator checks whether stated default pro",
        "An epoch is a full pass over the data; a step is one update — with N training crops and batch size B, one epoch takes N/B steps, and this ratio is what \"overnight retraining\" throughput actually depends on.",
        "Batching replaces a Python loop with one matrix multiplication — 64 hourly readings become a (64, features) matrix, and every row is processed identically and independently."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The forward pass as composed matrix operations\" teaches?",
      "choices": [
        "Pooling downsamples with a fixed, parameter-free rule (max or average); stride-2 convolutions downsample and learn what to keep, at the cost of extra parameters and compute.",
        "On a shared cluster, a debugging protocol is a budget decision : a ten-minute batch-overfit test is cheaper than an hour-long run repeated five times with no diagnosis.",
        "LeCun's 1989 Bell Labs system is the historical bridge from Rumelhart, Hinton, and Williams's theoretical demonstration to a working, economically motivated ZIP-code reader.",
        "The shape contract is (batch, in_features) @ (in_features, units) → (batch, units) — the weight matrix's shape never depends on batch size, only on feature counts."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A dense layer has weight matrix W of shape (3, 16) and you feed it a batch of 64 hourly readings, each with 3 features. What is the shape of the pre-activation output Z ?",
      "choices": [
        "(3, 16)",
        "(64, 3)",
        "(64, 16)",
        "(16, 64)"
      ],
      "correct": 2,
      "explain": "X is (64, 3) , W is (3, 16) ; matrix multiplication cancels the shared inner dimension (3) and keeps the outer dimensions, giving (64, 16) — 64 rows, 16 learned features per row. (B) is a tempting distractor because it's just the input shape unchanged — but the whole point of the layer is to transform the feature dimension from 3 to 16, so the output can't have the same shape as the input.",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit2#lesson-2": [
    {
      "stem": "Fill the blank: A _____ is a rule that takes a prediction and the true value it should have matched, and returns a single non-negative number that gets larger the more wrong the prediction was.",
      "choices": [
        "loss function",
        "L2 penalty",
        "learning rate first, always",
        "Cosine annealing"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “loss function”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (MSE) is the default regression loss for good reason: it's smooth everywhere, it has a clean derivative (which Unit 3 will use directly), and it penalizes big errors much more than small ones because the error gets squared.",
      "choices": [
        "hyperplane",
        "Mean Squared Error",
        "learning rate first, always",
        "Stochastic gradient descent"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Mean Squared Error”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (MAE) takes the absolute value instead of squaring:",
      "choices": [
        "regularization strength",
        "batched forward propagation",
        "Mean Absolute Error",
        "perceptron convergence theorem"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Mean Absolute Error”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is the compromise: quadratic (like MSE) for small errors, linear (like MAE) for large ones, switching at a threshold δ you choose.",
      "choices": [
        "Adam",
        "batch normalization",
        "Huber loss",
        "gradient"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Huber loss”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Loss functions: turning a prediction into one number\" teaches?",
      "choices": [
        "AdaGrad's accumulator only grows , so effective learning rates decay to zero over a long run; RMSProp's EMA replaces the sum and stops that decay.",
        "A conv kernel is a small, reusable set of learned weights (e.g. 3×3×C_in numbers) applied via a sliding dot product — this is what makes convolution cheap compared to a dense layer's one-weight-per-pixel-per-position scheme.",
        "Adam wins on heterogeneous features under a fixed budget; SGD+momentum can still win on generalization, memory, and homogeneous-feature policies. Neither is a strictly dominant default.",
        "A loss function is just \"prediction + truth → one number,\" but which number depends entirely on which errors you want to punish harder."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Loss functions: turning a prediction into one number\" teaches?",
      "choices": [
        "The learning rate is the single highest-leverage hyperparameter : too high diverges to NaN , too low crawls without meaningful progress, and a rate just below the divergence threshold often oscillates rather than converging cleanl",
        "MSE squares errors and lets large misses (like a missed demand spike) dominate; MAE treats all error sizes proportionally and is robust to sensor-glitch outliers; Huber blends both, quadratic near zero and linear past a threshold ",
        "On a shared cluster, a debugging protocol is a budget decision : a ten-minute batch-overfit test is cheaper than an hour-long run repeated five times with no diagnosis.",
        "Exclude biases and norm scale/shift parameters from weight decay — decaying them distorts the model's operating point and predicted-probability calibration, which matters directly when a regulator checks whether stated default pro"
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Your demand forecaster's training data has a handful of hours where a faulty occupancy sensor logged a wildly wrong headcount, producing occasional huge prediction errors that don't reflect real model failure. Which regression loss is most robust to those occasional large outliers?",
      "choices": [
        "MSE, because squaring rewards large errors with more learning signal",
        "MAE, because it penalizes all error magnitudes proportionally rather than quadratically",
        "Categorical cross-entropy, because it handles multiple classes",
        "Sum-reduced MSE, because summing dilutes any one outlier's effect"
      ],
      "correct": 1,
      "explain": "MAE grows linearly with error size, so one sensor-glitch hour with a huge error contributes proportionally to the total loss rather than dominating it the way a squared error would. (A) is backwards — MSE is exactly the loss that is most sensitive to outliers, since squaring a large error inflates it disproportionately, which is the opposite of what you want with unreliable sensor data.",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit2#lesson-3": [
    {
      "stem": "If your peak-demand classifier's training loss (BCE) steadily decreases over 50 epochs, that alone confirms the model will correctly flag peak-demand events on next year's data.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. A falling loss curve only shows that the optimizer is successfully shrinking the training objective — it's equally consistent with genuine learning and with the model memorizing this specific year's data (overfitting), which would fail on new data. The tempting trap here is treating \"loss went down\" as proof of a good model — the loss curve and generalization are related but distinc",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Given per-sample losses for a batch of 64 hourly readings, you have to _____ them to one scalar before anything downstream can use them.",
      "choices": [
        "Padding",
        "Sample weighting",
        "reduce",
        "Class weighting"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “reduce”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ fixes this by multiplying the loss contribution of the minority class before averaging, so the rare-but-important peak-trip hours count for more:",
      "choices": [
        "Warm restarts",
        "LR range test",
        "Class weighting",
        "biases"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Class weighting”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is more general: every individual row gets its own weight, chosen for whatever reason matters to your problem.",
      "choices": [
        "loss scaling",
        "Sample weighting",
        "LR range test",
        "Stochastic gradient descent"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Sample weighting”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"From per-sample loss to a training objective\" teaches?",
      "choices": [
        "Reduction (mean vs. sum) rescales the gradient the optimizer sees; mean keeps loss magnitude stable across batch sizes, sum doesn't — this is why mean is the default and why the choice is coupled to learning rate.",
        "Four gates, one job split four ways : forget (what to erase), input (what to write), candidate (what to propose), output (what to expose) — all sigmoid or tanh layers over [h_{t-1}, x_t] .",
        "The spectral radius of W_hh determines vanishing vs. exploding gradients — the same failure mode from Unit 3, now driven by sequence length instead of network depth.",
        "Parameter count per layer is n_in·n_out + n_out — arithmetic worth doing before training, since more parameters than labeled patient records is a memorization risk, not a capacity win."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"From per-sample loss to a training objective\" teaches?",
      "choices": [
        "Vanishing and exploding gradients are opposite failures of the same chain-rule product across layers — gradient clipping caps explosion by rescaling an over-large gradient norm, but it has no effect on a gradient that vanished fro",
        "Exclude biases and norm scale/shift parameters from weight decay — decaying them distorts the model's operating point and predicted-probability calibration, which matters directly when a regulator checks whether stated default pro",
        "Class weighting / pos_weight compensates for rare-but-costly events (peak-demand trips) that an unweighted average loss would let the model ignore.",
        "Backprop is reverse-mode automatic differentiation applied to the forward computational graph — not a separate algorithm bolted onto the network, but the chain rule mechanized one node at a time."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"From per-sample loss to a training objective\" teaches?",
      "choices": [
        "Masking has two required halves : zeroing the loss at padded timesteps and stopping the hidden state from recurring through fabricated padding — packed sequences handle both automatically, manual masking must handle both explicitl",
        "Early stopping needs its own validation signal , separate from the final out-of-time test read, and should restore the best-epoch checkpoint rather than simply halting at whatever epoch training reached.",
        "The hidden state is a lossy, fixed-size summary of an arbitrary-length past — it replaces the fixed-window MLP's forced choice between truncation and padding noise.",
        "Sample weighting generalizes class weighting to per-row control — down-weight bad sensor data, up-weight the hours you most need right."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Only 3% of hours in your dataset actually trip a peak-demand charge. Trained with plain unweighted BCE, your classifier reaches 97% accuracy by predicting \"no trip\" for every hour. What's the most direct fix, given what this lesson covered?",
      "choices": [
        "Switch reduction from mean to sum so rare events contribute more",
        "Apply a pos_weight to the positive (trip) class so its errors count more in the loss",
        "Switch from BCE to MSE, since MSE handles imbalance natively",
        "Increase the batch size until peak-trip hours appear more often"
      ],
      "correct": 1,
      "explain": "A pos_weight (often set to the negative:positive ratio, here roughly 32) scales up the loss contribution of true peak-trip hours, so the model can no longer get a low loss just by always predicting \"no trip.\" (A) is a distractor because switching mean to sum rescales the whole loss uniformly — it doesn't change the relative weight between classes at all, so the imbalance problem is untouched.",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit3#lesson-1": [
    {
      "stem": "Because backpropagation only needs each node's local gradient, a correct implementation never needs to store any of the forward pass's intermediate activations.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Local gradients are evaluated at the specific values the forward pass produced — ReLU's derivative depends on whether the pre-activation was positive or negative, and a matmul's gradient with respect to its weights is literally the cached input. Without caching those forward values, the backward pass has nothing to evaluate the local gradients at. The tempting reasoning is that \"loc",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Backpropagation builds a second graph over the same nodes, running in the opposite direction, in which every edge instead carries a _____ — how much a small change in that value would change the final loss.",
      "choices": [
        "step",
        "loss curve",
        "gradient",
        "Class weighting"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “gradient”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The key idea that makes this tractable is that every node only ever needs to know its own _____ — the derivative of its own output with respect to its own inputs, evaluated at the values it saw during the forward pass.",
      "choices": [
        "Leaky ReLU",
        "Huber loss",
        "ReLU",
        "local gradient"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “local gradient”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ AD picks one input, perturbs it symbolically, and propagates that perturbation forward through the graph to see how every output responds; the cost of one forward-mode pass scales with the number of inputs you care about.",
      "choices": [
        "universal approximation theorem",
        "Forward-mode",
        "regularization strength",
        "loss curve"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Forward-mode”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The chain rule on a computational graph\" teaches?",
      "choices": [
        "Backprop is reverse-mode automatic differentiation applied to the forward computational graph — not a separate algorithm bolted onto the network, but the chain rule mechanized one node at a time.",
        "For linearly separable data, convergence is guaranteed ; for anything else — like an XOR-shaped \"elevated on exactly one lab value\" rule — no amount of training fixes it, because the model class itself cannot bend.",
        "Universal approximation proves existence of a solution, not that training will find it — a single wide-enough hidden layer can approximate any continuous function in theory, but \"sufficient width\" can be computationally impractica",
        "Four gates, one job split four ways : forget (what to erase), input (what to write), candidate (what to propose), output (what to expose) — all sigmoid or tanh layers over [h_{t-1}, x_t] ."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The chain rule on a computational graph\" teaches?",
      "choices": [
        "Every node needs only its local gradient , evaluated at the forward-pass values it saw; the multivariable chain rule sums contributions when a value feeds multiple downstream paths.",
        "A GPU sitting at 20% utilization is a data-loader problem, not a model problem — more solved by prefetching workers and local caching than by any change to the model or precision.",
        "A perceptron computes w·x + b and thresholds it at zero — the weights encode feature importance and direction, the bias shifts the boundary off the origin.",
        "Stride, not kernel size, controls how much a layer downsamples; \"same\" padding just keeps the kernel itself shape-neutral at stride 1 so stride alone determines the shrink factor."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The chain rule on a computational graph\" teaches?",
      "choices": [
        "AdamW moves weight decay outside the adaptive denominator so decay strength no longer depends on how often a parameter happens to fire.",
        "Caching forward activations is mandatory because local gradients (ReLU's derivative, a matmul's derivative with respect to its weights) depend on the specific values computed on the way forward.",
        "GRU trades the separate cell state and two of the four gates for ~25% fewer parameters ; empirically it ties LSTM on most tasks and only meaningfully trails on the longest-range dependencies.",
        "Intermediate activations ( Z1 , A1 , Z2 ) must be cached during the forward pass — Unit 3's backward pass reuses them, and they carry a real memory cost at scale."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A ZIP-code classifier has one scalar cross-entropy loss as output and roughly 40,000 weights as inputs to differentiate with respect to. Why does reverse-mode automatic differentiation (backpropagation) beat forward-mode here?",
      "choices": [
        "Forward-mode cannot represent nonlinear operations like ReLU or softmax.",
        "Reverse-mode cost scales with the number of outputs (one loss), so a single backward pass yields the full gradient; forward-mode cost scales with the number of inputs (40",
        "Reverse-mode uses less memory because it never caches forward activations.",
        "Forward-mode only works for convolutional networks, not fully connected ones."
      ],
      "correct": 1,
      "explain": "Reverse-mode's cost is proportional to the number of outputs, and there is exactly one — the scalar loss — so one backward pass produces every weight's gradient at once. Forward-mode's cost is proportional to the number of inputs, so it would need one pass per weight, roughly 40,000 forward-mode passes to match a single backward pass. A is wrong — both modes handle nonlinear operations fine, they ",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit3#lesson-2": [
    {
      "stem": "Which statement matches what \"Backprop through a two-layer network, by hand\" teaches?",
      "choices": [
        "Channels-in tells you how deep one filter reaches into the input volume; channels-out tells you how many independently learned filters a layer applies, each producing its own feature map.",
        "The hidden state is a lossy, fixed-size summary of an arbitrary-length past — it replaces the fixed-window MLP's forced choice between truncation and padding noise.",
        "A high forget gate does not guarantee gradient survival — it makes it possible; a forget gate stuck near 0 still kills long-range signal, it just isn't the default failure mode anymore.",
        "Softmax plus cross-entropy collapses to p − y — one of the few places in deep learning where a seemingly complex derivative simplifies to something you can compute in your head."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Backprop through a two-layer network, by hand\" teaches?",
      "choices": [
        "Batch norm's regularizing effect is incidental (noise from batch composition), disappears at eval time and at large batch sizes, and should not be your primary or only defense against overfitting in an auditable model.",
        "Weight gradients are always the transposed input times the incoming gradient ( dW2 = hᵀ @ dz2 , dW1 = xᵀ @ dz1 ), and bias gradients are always a sum over the batch — the same pattern at every linear layer.",
        "Ill-conditioning is a ratio, not a size. A large condition number κ means the stability constraint on the steep direction and the progress rate on the shallow direction pull the single SGD learning rate in opposite directions — th",
        "Width adds parallel learned feature-combinations; depth composes combinations of combinations — neither is strictly better, and depth trades easier training for parameter efficiency."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Backprop through a two-layer network, by hand\" teaches?",
      "choices": [
        "ReLU backprop is a binary mask from the cached pre-activation: a unit that was zero (or negative) on the forward pass gets exactly zero gradient, regardless of how large the downstream gradient is.",
        "Lambda has no closed-form choice — sweep it on a log scale against a validation slice that resembles the scoring vintage, and watch for underfitting (both curves plateauing high) at the top of the range.",
        "Ill-conditioning is a ratio, not a size. A large condition number κ means the stability constraint on the steep direction and the progress rate on the shallow direction pull the single SGD learning rate in opposite directions — th",
        "The historical lesson matters as much as the math: an entire research program stalled for a decade over a limitation that stacking units and adding nonlinearity resolves."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Backprop through a two-layer network, by hand\" teaches?",
      "choices": [
        "Global average pooling replaces flatten+dense heads, cutting a would-be multi-million-parameter final layer down to zero-parameter pooling plus one small linear layer.",
        "Per-parameter scaling exists because features fire at wildly different rates — a rarely-firing contact feature and an always-firing joint-angle feature cannot share one global learning rate without one of them being mistreated.",
        "The additive cell-state update c_t = f_t⊙c_{t-1} + i_t⊙c̃_t replaces repeated matrix multiplication with elementwise gating, which is the actual mechanism that lets gradients survive across long ICU stays.",
        "Gradient shapes must match parameter shapes — this is the single cheapest correctness check available and catches the majority of hand-derivation and implementation bugs."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Backprop through a two-layer network, by hand\" teaches?",
      "choices": [
        "Gradient clipping treats the symptom of explosion, not the cause ; it keeps training numerically stable but does nothing for vanishing, which needs an architectural fix.",
        "A small, hand-checkable example (two inputs, two hidden units, three classes) exercises the exact same mechanism as the full 256-input, 10-class network, just at a size a calculator can verify.",
        "An epoch is a full pass over the data; a step is one update — with N training crops and batch size B, one epoch takes N/B steps, and this ratio is what \"overnight retraining\" throughput actually depends on.",
        "Mixup and feature-noise jitter are more defensible on tabular credit data than SMOTE , but should be restricted to continuous fields — linearly interpolating a 0/1 bankruptcy flag produces a value with no real meaning."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Fill in the missing line so this ReLU backward step matches the derivation from Lesson 2, given cached pre-activation z1 and incoming gradient dh .",
      "choices": [
        "dh * (z1 > 0)",
        "dh * z1",
        "np.maximum(dh, 0)",
        "dh / z1"
      ],
      "correct": 0,
      "explain": "ReLU's local gradient is 1 where the cached pre-activation was positive and 0 otherwise; multiplying the incoming gradient by that boolean mask zeroes out exactly the units that were inactive on the forward pass. C is the tempting distractor because np.maximum(x, 0) is the forward-pass ReLU formula itself — applying it to the gradient dh during the backward pass is a category error, clamping the g",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit3#lesson-3": [
    {
      "stem": "Gradient clipping — rescaling the gradient when its norm exceeds a threshold — is an effective fix for vanishing gradients in a deep sigmoid network.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Gradient clipping caps a gradient that has grown too large, which addresses exploding gradients. Vanishing gradients are the opposite problem — the gradient has shrunk toward zero from many small local derivatives (like sigmoid's, at most 0.25) multiplied together across layers — and no amount of rescaling a near-zero value makes it carry more signal. The confusion is understandable",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ computes the gradient over the entire training set — every labeled ZIP-code crop available — before taking a single step.",
      "choices": [
        "hyperplane",
        "batch size",
        "Long Short-Term Memory",
        "Batch gradient descent"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Batch gradient descent”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (SGD, in the narrow historical sense of the term) takes the opposite extreme: compute the gradient from a single example and update immediately.",
      "choices": [
        "gradient clipping",
        "Mini-batch gradient descent",
        "Stochastic gradient descent",
        "skip connection"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Stochastic gradient descent”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is the practical compromise nearly every real system uses, including the ZIP-code sorter in this course: compute the gradient over a modest batch, typically 32 to 256 examples, average it, and update.",
      "choices": [
        "perceptron convergence theorem",
        "Mini-batch gradient descent",
        "feature map",
        "spectral radius"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Mini-batch gradient descent”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Gradient descent: batch, stochastic, and mini-batch\" teaches?",
      "choices": [
        "The update rule is always θ ← θ − η∇L(θ) — batch, stochastic, and mini-batch gradient descent differ only in how much data is averaged into ∇L(θ) before each step.",
        "Backprop is reverse-mode automatic differentiation applied to the forward computational graph — not a separate algorithm bolted onto the network, but the chain rule mechanized one node at a time.",
        "Parameter count per layer is n_in·n_out + n_out — arithmetic worth doing before training, since more parameters than labeled patient records is a memorization risk, not a capacity win.",
        "Per-parameter scaling exists because features fire at wildly different rates — a rarely-firing contact feature and an always-firing joint-angle feature cannot share one global learning rate without one of them being mistreated."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "This training loop trains noticeably worse than expected across many runs, even at a reasonable learning rate. Find the bug.",
      "choices": [
        "The learning rate is applied inside the loop instead of after it.",
        "There is no shuffling — every epoch slices the same fixed contiguous blocks of X and Y in the same order, so if the data is sorted or grouped by digit, batches are non-re",
        "cross_entropy is called before backward , which is the wrong order.",
        "The gradients should be added to the parameters, not subtracted."
      ],
      "correct": 1,
      "explain": "The loop always takes contiguous slices of X and Y in the same fixed order every epoch. If the underlying ZIP-code data was collected or stored grouped by digit (all 0s, then all 1s, and so on — a realistic scenario for scanned batches from a single sorting run), every mini-batch is systematically unrepresentative, and the same skewed batches repeat epoch after epoch, biasing the gradient estimate",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit4#lesson-1": [
    {
      "stem": "Nesterov momentum will noticeably outperform classical momentum on almost every training run, because its look-ahead gradient is always a better estimate.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. On a smooth, static landscape with a typical β=0.9, classical and Nesterov momentum trajectories are nearly indistinguishable. The look-ahead correction earns its keep specifically at larger β (0.99+) or near sharp local curvature changes — like a foot-contact or object-contact event — not as a universal improvement. The claim sounds plausible because Nesterov is \"more correct\" in a",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ κ = λ_max / λ_min is the ratio of the steepest curvature direction to the flattest one.",
      "choices": [
        "sigmoid",
        "condition number",
        "Reverse-mode",
        "fp16"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “condition number”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Momentum fixes this by keeping a running _____ buffer that accumulates gradients over time instead of reacting to only the latest one:",
      "choices": [
        "ordered debugging protocol",
        "velocity",
        "SMOTE",
        "regularization strength"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “velocity”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Momentum: why plain SGD stalls in ravines\" teaches?",
      "choices": [
        "Ill-conditioning is a ratio, not a size. A large condition number κ means the stability constraint on the steep direction and the progress rate on the shallow direction pull the single SGD learning rate in opposite directions — th",
        "Batch norm's train/eval asymmetry — live batch statistics during training, a fixed running-average estimate at eval — means its effective behavior on a given applicant's row can differ from what was seen during training if running",
        "Model parallelism is only needed when one model copy doesn't fit on one GPU at batch size 1 — data parallelism is the correct default otherwise.",
        "A layer is f(W·x + b) — an affine transform followed by a fixed activation — and stacking these is the entire definition of a multi-layer perceptron."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Momentum: why plain SGD stalls in ravines\" teaches?",
      "choices": [
        "Reduction (mean vs. sum) rescales the gradient the optimizer sees; mean keeps loss magnitude stable across batch sizes, sum doesn't — this is why mean is the default and why the choice is coupled to learning rate.",
        "GPU memory is parameters + gradients + optimizer state + activations — Adam's two moment buffers make its optimizer-state cost alone roughly 2× parameter size, on top of gradients, for roughly 4× total versus plain SGD's 2×.",
        "The decision boundary is always a hyperplane — a straight line in 2D, a flat plane in 3D, and so on — regardless of how the weights are tuned.",
        "Momentum's velocity buffer cancels alternating-sign noise and accumulates consistent-sign signal, which is exactly the structure of oscillate-on-steep, drift-on-shallow."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Momentum: why plain SGD stalls in ravines\" teaches?",
      "choices": [
        "BPTT stores every timestep's activations ; truncated BPTT trades gradient reach for a fixed memory budget by chunking the stay and carrying only the hidden state (not stored activations) across chunk boundaries.",
        "Stride, not kernel size, controls how much a layer downsamples; \"same\" padding just keeps the kernel itself shape-neutral at stride 1 so stride alone determines the shrink factor.",
        "An epoch is a full pass over the data; a step is one update — with N training crops and batch size B, one epoch takes N/B steps, and this ratio is what \"overnight retraining\" throughput actually depends on.",
        "β sets an effective averaging window of about 1/(1-β) steps — 10 steps at β=0.9, 100 at β=0.99 — and a bigger window trades faster shallow-direction progress for slower reaction to genuine changes in descent direction, like a gait"
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Momentum: why plain SGD stalls in ravines\" teaches?",
      "choices": [
        "The learning rule only updates on mistakes : w ← w + η(y − ŷ)x , which is why training halts automatically once every point is correctly classified.",
        "Pooling downsamples with a fixed, parameter-free rule (max or average); stride-2 convolutions downsample and learn what to keep, at the cost of extra parameters and compute.",
        "Global average pooling replaces flatten+dense heads, cutting a would-be multi-million-parameter final layer down to zero-parameter pooling plus one small linear layer.",
        "Nesterov's look-ahead mostly pays off at large β or near sharp curvature changes — foot-contact events, object-contact events — not on smooth, static bowls where it's nearly indistinguishable from classical momentum."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "You're training a quadruped locomotion policy with the plain SGD update from Unit 3. The loss curve oscillates sharply step to step and only trends down very slowly over 2,000 steps. A quick diagonal-curvature estimate puts the condition number around 200. What should you try first?",
      "choices": [
        "Raise the learning rate so the oscillation resolves faster.",
        "Add classical momentum (β≈0.9) so alternating-sign gradients along the steep direction cancel while the consistent shallow-direction signal accumulates.",
        "Increase the batch size and change nothing else about the update rule.",
        "Add weight decay to shrink the oscillating parameters."
      ],
      "correct": 1,
      "explain": "A high condition number with oscillation-and-slow-progress is exactly the ravine pattern from Lesson 1 — momentum's velocity buffer cancels the alternating-sign steep-direction gradients and accumulates the consistent shallow-direction signal. A is the tempting-but-wrong move: raising lr in an already ill-conditioned bowl pushes the steep direction closer to its stability limit 2/λ_max , making th",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit4#lesson-2": [
    {
      "stem": "Fill the blank: _____ keeps two exponential moving averages per parameter — a first moment (the momentum from Lesson 1) and a second moment (RMSProp's squared-gradient estimate) — and then corrects both for the fact that they start at zero:",
      "choices": [
        "Stochastic gradient descent",
        "architecture",
        "saturation",
        "Adam"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Adam”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Adaptive methods: AdaGrad, RMSProp, Adam, AdamW\" teaches?",
      "choices": [
        "Exclude biases and norm scale/shift parameters from weight decay — decaying them distorts the model's operating point and predicted-probability calibration, which matters directly when a regulator checks whether stated default pro",
        "Weight sharing across timesteps ( W_xh , W_hh reused at every step) is what lets one architecture handle a 40-minute admission and a 9-day stay without changing parameter count.",
        "Per-parameter scaling exists because features fire at wildly different rates — a rarely-firing contact feature and an always-firing joint-angle feature cannot share one global learning rate without one of them being mistreated.",
        "Parameter count per layer is n_in·n_out + n_out — arithmetic worth doing before training, since more parameters than labeled patient records is a memorization risk, not a capacity win."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Adaptive methods: AdaGrad, RMSProp, Adam, AdamW\" teaches?",
      "choices": [
        "Ill-conditioning is a ratio, not a size. A large condition number κ means the stability constraint on the steep direction and the progress rate on the shallow direction pull the single SGD learning rate in opposite directions — th",
        "A network's receptive field at its final layer must exceed the physical size of the pattern it needs to recognize as one coherent object, not just detect fragments of.",
        "An epoch is a full pass over the data; a step is one update — with N training crops and batch size B, one epoch takes N/B steps, and this ratio is what \"overnight retraining\" throughput actually depends on.",
        "AdaGrad's accumulator only grows , so effective learning rates decay to zero over a long run; RMSProp's EMA replaces the sum and stops that decay."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Adaptive methods: AdaGrad, RMSProp, Adam, AdamW\" teaches?",
      "choices": [
        "Early stopping needs its own validation signal , separate from the final out-of-time test read, and should restore the best-epoch checkpoint rather than simply halting at whatever epoch training reached.",
        "Channels-in tells you how deep one filter reaches into the input volume; channels-out tells you how many independently learned filters a layer applies, each producing its own feature map.",
        "Universal approximation proves existence of a solution, not that training will find it — a single wide-enough hidden layer can approximate any continuous function in theory, but \"sufficient width\" can be computationally impractica",
        "Adam's bias correction matters most at step 1 , where the uncorrected moments understate the true gradient by a factor tied directly to β1 and β2 — skipping it wastes the earliest, often most expensive, training steps."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Adaptive methods: AdaGrad, RMSProp, Adam, AdamW\" teaches?",
      "choices": [
        "AdamW moves weight decay outside the adaptive denominator so decay strength no longer depends on how often a parameter happens to fire.",
        "LeCun's 1989 Bell Labs system is the historical bridge from Rumelhart, Hinton, and Williams's theoretical demonstration to a working, economically motivated ZIP-code reader.",
        "GRU trades the separate cell state and two of the four gates for ~25% fewer parameters ; empirically it ties LSTM on most tasks and only meaningfully trails on the longest-range dependencies.",
        "The spectral radius of W_hh determines vanishing vs. exploding gradients — the same failure mode from Unit 3, now driven by sequence length instead of network depth."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A 7-DOF arm's grasp policy has a fingertip force-sensor feature that fires on about 2% of timesteps early in training, while joint-angle features update every step. Plain SGD with a single learning rate either destabilizes the joint-angle weights or leaves the contact weights barely trained. Which change addresses this specific mismatch?",
      "choices": [
        "Switch to Nesterov momentum instead of classical momentum.",
        "Switch to an adaptive method (RMSProp or Adam) that scales each parameter's effective learning rate by its own accumulated gradient statistics.",
        "Lower the global learning rate until the joint-angle weights stop diverging.",
        "Increase the rollout batch size so the contact feature fires more often."
      ],
      "correct": 1,
      "explain": "This is precisely the problem Lesson 2 opens with: features that fire at very different rates need per-parameter learning rate scaling, which momentum alone does not provide — momentum changes how gradients over time are combined, but still applies one shared learning rate to every parameter. C is the tempting distractor: lowering the global rate does stop the joint-angle weights from diverging, b",
      "difficulty": "hard"
    },
    {
      "stem": "A teammate's Adam implementation is producing wildly oversized updates in the first ~10 steps of a grasping-policy run, before settling down. Find the bug.",
      "choices": [
        "The learning rate default of 1e-3 is too high for a robotics policy.",
        "Bias correction (dividing m and v by 1-b1**t and 1-b2**t ) is missing, so early steps use raw moment estimates that understate the true gradient by very different factors",
        "eps should be added inside the square root, not outside it.",
        "The squared gradient should use abs(g) instead of g ** 2 ."
      ],
      "correct": 1,
      "explain": "Without correction, m at step 1 is only (1-b1)=10% of the true gradient while v at step 1 is only (1-b2)=0.1% of the true squared gradient — the numerator and denominator are biased by very different factors, so the ratio m/√v is arbitrarily mis-scaled for the first several steps until both EMAs \"warm up,\" matching the reported symptom exactly. A is a real tuning consideration for robotics in gene",
      "difficulty": "hard"
    },
    {
      "stem": "Complete the one-line change that turns this Adam step into AdamW (decoupled weight decay), given weight decay coefficient wd .",
      "choices": [
        "w = w - lr * wd * m_hat",
        "w = w - lr * wd * w",
        "g = g + wd * w (added before computing m and v )",
        "w = w * (1 - wd) (applied once, before training starts)"
      ],
      "correct": 1,
      "explain": "AdamW applies decay directly to the weight, outside the √v_hat denominator entirely — that's the decoupling. C is the tempting distractor because it looks like ordinary L2 regularization, and it is — but that's precisely the coupled version Lesson 2 says AdamW moves away from: folding decay into g means it gets divided by √v_hat along with the rest of the gradient, so frequently-updated parameters",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit4#lesson-3": [
    {
      "stem": "Fill the blank: _____ drops lr by a fixed factor at fixed milestones — for instance 3e-4 → 3e-5 at step 300k, then →3e-6 at 600k.",
      "choices": [
        "learning rate first, always",
        "batch normalization",
        "Step decay",
        "Long Short-Term Memory"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Step decay”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ instead follows a smooth curve down to a floor over a known total budget T :",
      "choices": [
        "step",
        "receptive field",
        "Cosine annealing",
        "Batch gradient descent"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Cosine annealing”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ schedule (Smith) spans the entire budget in a single up-then-down cycle, often overshooting the naive peak lr while momentum is annealed in the opposite direction (lr rises while momentum falls, then lr falls while momentum rises).",
      "choices": [
        "one-cycle",
        "log-uniformly",
        "Pooling",
        "spectral radius"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “one-cycle”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (SGDR) periodically reset lr back up to peak, following a cosine decay, several times across training.",
      "choices": [
        "ordered debugging protocol",
        "Warm restarts",
        "Sample weighting",
        "sigmoid"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Warm restarts”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Learning rate schedules and how to choose one\" teaches?",
      "choices": [
        "Output-layer activation depends on the prediction task, not on convention : sigmoid for one binary probability, softmax for mutually exclusive multi-class probabilities, no activation for unbounded regression.",
        "Label smoothing curbs overconfident probabilities , but at a 2% base rate the smoothing amount ε must be small (roughly 0.01–0.02) or the softened majority-class target will visibly bias the portfolio's average predicted default r",
        "An epoch is a full pass over the data; a step is one update — with N training crops and batch size B, one epoch takes N/B steps, and this ratio is what \"overnight retraining\" throughput actually depends on.",
        "A schedule is just lr(step) — it changes the same number for every parameter, unlike Lesson 2's per-parameter adaptive scaling, and the two combine freely."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Learning rate schedules and how to choose one\" teaches?",
      "choices": [
        "Binary cross-entropy punishes confidently wrong probability predictions with unbounded loss — a critical property for a rare, costly event like a peak-demand trip.",
        "Adam's bias correction matters most at step 1 , where the uncorrected moments understate the true gradient by a factor tied directly to β1 and β2 — skipping it wastes the earliest, often most expensive, training steps.",
        "Warmup exists because early gradients are large, noisy, and badly scaled — skipping it risks pushing a policy into an unrecoverable bad region before the moving averages have caught up.",
        "Bisect the pipeline like a commit range — swap in a trivial model, swap in random labels, disable augmentation — so each test halves the remaining search space instead of guessing at hyperparameters."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "You scale up a quadruped training run from 512 to 2,048 parallel simulated robot instances (4x the batch size), keeping total sample budget roughly fixed. You apply the linear scaling rule and raise the peak learning rate 4x to match, but leave the warmup length exactly as it was on the smaller run. Within the first few hundred steps, sev",
      "choices": [
        "The warmup length should have been extended roughly in proportion to the peak learning rate — a 4x larger peak step needs proportionally longer to ramp in, so the unchang",
        "Larger batches always destabilize training regardless of learning rate, so the fix is to reduce the batch size back down.",
        "The problem is unrelated to batch size; switch optimizers from Adam to plain SGD.",
        "Increase β2 in Adam to 0.9999 to fix the instability."
      ],
      "correct": 0,
      "explain": "Scaling peak lr with batch size was the right call — but the linear scaling rule has a second half: warmup has to lengthen in proportion too. Warmup exists because early gradients are large, noisy, and badly scaled, and a 4x larger peak step makes that early window more dangerous, not less. Holding warmup fixed means the run hits a 4x larger lr at the same early step it used to hit the old one, wh",
      "difficulty": "hard"
    },
    {
      "stem": "Your team is training a grasping policy on a shared cluster where the actual number of steps you'll get is uncertain — your allocation can be reclaimed at any time. The eval metric (average return on a fixed sim-eval suite) is also fairly noisy run to run. Which schedule fits this situation best?",
      "choices": [
        "Cosine annealing over an assumed total budget of 200k steps.",
        "One-cycle spanning an assumed total budget of 200k steps.",
        "ReduceLROnPlateau, monitoring eval return with a patience window, since no schedule that assumes a fixed total-step horizon fits an unknown, revocable budget.",
        "Step decay at fixed milestones of 50k/100k/150k steps."
      ],
      "correct": 2,
      "explain": "Both cosine and one-cycle bake a fixed horizon into the curve; if the run ends early (allocation reclaimed) the decay never completes as planned, and if it ends via a warm-restart-style scheme mid-restart, it's stranded with lr pushed back up and no time left to bring it down. Plateau-based scheduling makes no assumption about total steps and reacts directly to whether the (admittedly noisy) eval ",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit5#lesson-1": [
    {
      "stem": "Because adding an L2 term to the loss and applying \"weight decay\" both produce a gradient contribution of λ·w , they are mathematically equivalent regularizers regardless of which optimizer is used — including Adam.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. They are equivalent under plain SGD, but under Adam the L2-in-the-loss version has its λ·w gradient divided by the same per-parameter √v̂ + ε denominator as the data gradient, so its effective decay strength varies per weight depending on that weight's gradient history. AdamW's decoupled decay applies w ← w − η·λ·w outside that denominator, giving a uniform proportional decay instea",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The standard first lever is an _____ on the weights, commonly called weight decay .",
      "choices": [
        "saturation",
        "forget gate",
        "local gradient",
        "L2 penalty"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “L2 penalty”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The standard first lever is an L2 penalty on the weights, commonly called _____ .",
      "choices": [
        "Stochastic gradient descent",
        "one-cycle",
        "step function",
        "weight decay"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “weight decay”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Standard practice excludes _____ and the scale/shift parameters of normalization layers (covered in Lesson 3) from weight decay.",
      "choices": [
        "GPU memory",
        "Step decay",
        "linear scaling rule",
        "biases"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “biases”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Diagnosing overfitting, and controlling capacity with weight penalties\" teaches?",
      "choices": [
        "Stacked linear layers collapse to one linear layer — W2(W1x+b1)+b2 always simplifies to a single W'x+b' , so nonlinearity is what makes depth meaningful, not optional decoration.",
        "Early layers learn generic edge and color-opponent detectors (useful for blight's necrotic edges, mosaic's chlorotic color shift); depth is what turns those primitives into disease-specific pattern detectors.",
        "Stride, not kernel size, controls how much a layer downsamples; \"same\" padding just keeps the kernel itself shape-neutral at stride 1 so stride alone determines the shrink factor.",
        "A widening train/val gap after the validation peak is the practical signature of overfitting — more useful for day-to-day diagnosis than the classical bias-variance curve, which doesn't cleanly describe over-parameterized deep net"
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Diagnosing overfitting, and controlling capacity with weight penalties\" teaches?",
      "choices": [
        "Shapes carry a batch dimension and a feature dimension ; a layer's weight matrix shape is (n_in, n_out) , and getting an axis wrong produces either a crash or, worse, a silent broadcast that computes garbage.",
        "AdamW moves weight decay outside the adaptive denominator so decay strength no longer depends on how often a parameter happens to fire.",
        "SMOTE manufactures synthetic minority rows by interpolating real defaulters' features , which can create bureau-attribute combinations no real applicant would have, and does nothing to address training-vs-scoring vintage shift.",
        "L2-in-the-loss and weight decay are the same thing only under plain SGD. Under Adam, differentiating an L2 penalty gets it rescaled by the same per-parameter second-moment estimate as the data gradient — AdamW's decoupled decay av"
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Diagnosing overfitting, and controlling capacity with weight penalties\" teaches?",
      "choices": [
        "Leaky ReLU and GELU exist specifically to patch ReLU's dead-unit failure mode , at the cost of a hyperparameter or extra compute respectively.",
        "Early layers learn generic edge and color-opponent detectors (useful for blight's necrotic edges, mosaic's chlorotic color shift); depth is what turns those primitives into disease-specific pattern detectors.",
        "Exclude biases and norm scale/shift parameters from weight decay — decaying them distorts the model's operating point and predicted-probability calibration, which matters directly when a regulator checks whether stated default pro",
        "Batch norm's train/eval asymmetry — live batch statistics during training, a fixed running-average estimate at eval — means its effective behavior on a given applicant's row can differ from what was seen during training if running"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Diagnosing overfitting, and controlling capacity with weight penalties\" teaches?",
      "choices": [
        "L1 induces exact sparsity (useful for pruning uninformative bureau features) but its non-smooth gradient makes it less common inside deep nets than L2/AdamW-style decay.",
        "A network's receptive field at its final layer must exceed the physical size of the pattern it needs to recognize as one coherent object, not just detect fragments of.",
        "Output-layer activation depends on the prediction task, not on convention : sigmoid for one binary probability, softmax for mutually exclusive multi-class probabilities, no activation for unbounded regression.",
        "RNNs still win where attention structurally can't compete : O(1) compute and memory per new timestep for streaming, always-on, resource-constrained monitoring — the honest trade-off, not a claim that RNNs are broadly superior."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    }
  ],
  "course-1-deep-learning/unit5#lesson-2": [
    {
      "stem": "Fill the blank: _____ (Synthetic Minority Oversampling Technique) generates synthetic minority-class (default) rows by interpolating between a real minority example and its nearest minority neighbors in feature space.",
      "choices": [
        "backpropagation through time",
        "one-cycle",
        "Width",
        "SMOTE"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “SMOTE”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Zhang et al., 2017) interpolates both features and labels: x = λ·x_i + (1−λ)·x_j , y = λ·y_i + (1−λ)·y_j for a random pair of examples and a random λ .",
      "choices": [
        "logits",
        "Mixup",
        "Width",
        "Padding"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Mixup”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ softens the targets before computing the loss: y_smooth = y·(1 − ε) + ε/2 for a binary target, so a true label of 1 becomes, say, 0.95 rather than 1.0, and a true label of 0 becomes 0.05 rather than 0.0.",
      "choices": [
        "one-cycle",
        "Label smoothing",
        "receptive field",
        "weight decay"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Label smoothing”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Dropout, augmentation, and label smoothing\" teaches?",
      "choices": [
        "GPU memory is parameters + gradients + optimizer state + activations — Adam's two moment buffers make its optimizer-state cost alone roughly 2× parameter size, on top of gradients, for roughly 4× total versus plain SGD's 2×.",
        "Dropout trains an implicit ensemble of weight-sharing thinned subnetworks; inverted dropout rescales survivors by 1/(1−p) at train time specifically so eval requires no correction at all.",
        "Sigmoid and tanh saturate on both tails , driving gradients toward zero and slowing or stalling learning in deeper stacks; ReLU saturates only on the negative side , and can go fully dead there.",
        "Nesterov's look-ahead mostly pays off at large β or near sharp curvature changes — foot-contact events, object-contact events — not on smooth, static bowls where it's nearly indistinguishable from classical momentum."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Dropout, augmentation, and label smoothing\" teaches?",
      "choices": [
        "Forgetting to gate dropout on a training flag is a silent bug , not a crash — it makes a deployed model's predictions nondeterministic for the same input, which is exactly the kind of defect a regulated scoring pipeline cannot tol",
        "Exclude biases and norm scale/shift parameters from weight decay — decaying them distorts the model's operating point and predicted-probability calibration, which matters directly when a regulator checks whether stated default pro",
        "Equivariance ≠ invariance: shifting the input shifts a conv layer's output correspondingly (equivariant); the output staying the same regardless of position (invariant) only emerges after pooling/global-aggregation is stacked on t",
        "Weight sharing across timesteps ( W_xh , W_hh reused at every step) is what lets one architecture handle a 40-minute admission and a 9-day stay without changing parameter count."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Dropout, augmentation, and label smoothing\" teaches?",
      "choices": [
        "AdaGrad's accumulator only grows , so effective learning rates decay to zero over a long run; RMSProp's EMA replaces the sum and stops that decay.",
        "Vanishing and exploding gradients are opposite failures of the same chain-rule product across layers — gradient clipping caps explosion by rescaling an over-large gradient norm, but it has no effect on a gradient that vanished fro",
        "SMOTE manufactures synthetic minority rows by interpolating real defaulters' features , which can create bureau-attribute combinations no real applicant would have, and does nothing to address training-vs-scoring vintage shift.",
        "Mini-batches of 32–256 examples are the practical default because they cut gradient noise far below single-example SGD while still matching the vectorized width of real hardware — unlike full-batch, which is accurate but too slow "
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A team addresses their 2% positive rate by applying SMOTE to oversample synthetic delinquent applicants before training. During model review, an auditor objects. Which objection is most directly supported by how SMOTE works?",
      "choices": [
        "SMOTE can produce synthetic applicants whose interpolated bureau-attribute combinations don't correspond to any real applicant, and does nothing to correct for shift betw",
        "SMOTE always reduces the model's validation AUC, so it should never be used with imbalanced data.",
        "SMOTE requires the labels to be smoothed before oversampling, which this team skipped.",
        "SMOTE can only be applied to categorical features, so it doesn't work on bureau data at all."
      ],
      "correct": 0,
      "explain": "SMOTE interpolates between real minority-class neighbors in feature space to create synthetic rows; those interpolated feature combinations may not represent any realizable applicant, and since SMOTE only resamples structure already present in the training vintage, it provides no protection against — and can even reinforce sensitivity to — the training/scoring vintage shift. Option B overstates th",
      "difficulty": "hard"
    },
    {
      "stem": "A team applies label smoothing with ε = 0.3 to their credit model, whose true positive rate is 2%. What is the most likely effect on the portfolio's average predicted probability of default?",
      "choices": [
        "No effect — label smoothing only changes gradients early in training, not final predictions.",
        "The average predicted probability will be systematically inflated well above the true 2% base rate, because the softened negative-class target (0.15) is far above 0.",
        "The average predicted probability will be systematically deflated below 2%.",
        "Predictions become perfectly calibrated, since label smoothing is specifically designed to fix calibration."
      ],
      "correct": 1,
      "explain": "With ε = 0.3, a true-negative target of 0 becomes 0.15. Since 98% of rows are true negatives, the model is trained to output roughly 0.15 for the vast majority of applicants — over 7x the true 2% base rate — which will visibly inflate the portfolio's average predicted probability of default. Option D is the tempting distractor: label smoothing does curb overconfidence, but \"curbing overconfidence\"",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit5#lesson-3": [
    {
      "stem": "Santurkar et al. (2018) found that batch normalization works primarily by reducing internal covariate shift, confirming the mechanism proposed in the original 2015 batch norm paper.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Santurkar et al. found the opposite: batch norm doesn't meaningfully reduce internal covariate shift, and networks with batch norm train just as well even when covariate-shift-like instability is deliberately injected into their activations. Their evidence instead supports batch norm working by smoothing the loss landscape (making gradients more predictable), which allows larger, mo",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Ba, Kiros, and Hinton, 2016) normalizes across the feature dimension for a single example, rather than across the batch dimension for a single feature.",
      "choices": [
        "backpropagation through time",
        "mask",
        "loss function",
        "Layer normalization"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Layer normalization”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Normalization layers and early stopping\" teaches?",
      "choices": [
        "A network's receptive field at its final layer must exceed the physical size of the pattern it needs to recognize as one coherent object, not just detect fragments of.",
        "Sigmoid and tanh saturate on both tails , driving gradients toward zero and slowing or stalling learning in deeper stacks; ReLU saturates only on the negative side , and can go fully dead there.",
        "Batch norm's train/eval asymmetry — live batch statistics during training, a fixed running-average estimate at eval — means its effective behavior on a given applicant's row can differ from what was seen during training if running",
        "GRU trades the separate cell state and two of the four gates for ~25% fewer parameters ; empirically it ties LSTM on most tasks and only meaningfully trails on the longest-range dependencies."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Normalization layers and early stopping\" teaches?",
      "choices": [
        "L1 induces exact sparsity (useful for pruning uninformative bureau features) but its non-smooth gradient makes it less common inside deep nets than L2/AdamW-style decay.",
        "The internal-covariate-shift explanation for batch norm was empirically undercut by Santurkar et al. (2018); the smoother, more predictable loss landscape it produces is the better-supported explanation for why it helps.",
        "Width adds parallel learned feature-combinations; depth composes combinations of combinations — neither is strictly better, and depth trades easier training for parameter efficiency.",
        "Overfitting one batch to near-zero loss is the single highest-value diagnostic — it rules out data-scale and generalization issues at once and isolates bugs to the forward pass, loss function, or label pipeline."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Normalization layers and early stopping\" teaches?",
      "choices": [
        "Layer norm normalizes per example, not per batch , giving it no batch-size dependence and identical train/eval behavior — a safer default when minibatches are small or skewed by class-imbalance resampling.",
        "Channels-in tells you how deep one filter reaches into the input volume; channels-out tells you how many independently learned filters a layer applies, each producing its own feature map.",
        "Intermediate activations ( Z1 , A1 , Z2 ) must be cached during the forward pass — Unit 3's backward pass reuses them, and they carry a real memory cost at scale.",
        "Weight sharing across timesteps ( W_xh , W_hh reused at every step) is what lets one architecture handle a 40-minute admission and a 9-day stay without changing parameter count."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Normalization layers and early stopping\" teaches?",
      "choices": [
        "Model parallelism is only needed when one model copy doesn't fit on one GPU at batch size 1 — data parallelism is the correct default otherwise.",
        "The spectral radius of W_hh determines vanishing vs. exploding gradients — the same failure mode from Unit 3, now driven by sequence length instead of network depth.",
        "Batch norm's regularizing effect is incidental (noise from batch composition), disappears at eval time and at large batch sizes, and should not be your primary or only defense against overfitting in an auditable model.",
        "Adam wins on heterogeneous features under a fixed budget; SGD+momentum can still win on generalization, memory, and homogeneous-feature policies. Neither is a strictly dominant default."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Your delinquency model's training loss falls steadily through epoch 40, but validation AUC peaks at 0.781 on epoch 6 and drifts down to 0.760 by epoch 30. The train/val gap widens steadily after epoch 6. Which is the most appropriate first thing to try?",
      "choices": [
        "Increase the learning rate so the network reaches its best epoch sooner.",
        "Add or increase weight decay (and/or introduce early stopping) to control capacity.",
        "Remove batch normalization, since the drift must be caused by internal covariate shift.",
        "Switch the loss function from cross-entropy to mean squared error."
      ],
      "correct": 1,
      "explain": "Falling train loss with a validation metric that peaks and then reverses is the textbook signature of overfitting/variance — the fix is to constrain effective capacity, via a weight penalty, dropout, or stopping training at the good epoch. Option C is a tempting distractor because \"internal covariate shift\" sounds like the right vocabulary, but the term describes a (largely disproven) explanation ",
      "difficulty": "hard"
    },
    {
      "stem": "A model-risk analyst wants to select early-stopping's patience and min_delta by trying a few values and picking whichever gives the highest AUC on the out-of-time test set reserved for the final regulatory sign-off. What is wrong with this plan?",
      "choices": [
        "Nothing — early stopping doesn't count as a hyperparameter, so it's fine to tune against the test set.",
        "It leaks the test set into model selection, the same way tuning learning rate or lambda on it would; the final reported AUC becomes an optimistic estimate of deployed per",
        "Patience and min_delta have no effect on AUC, so the exercise is pointless but harmless.",
        "Early stopping should always use patience=1, so no tuning is needed either way."
      ],
      "correct": 1,
      "explain": "The stopping epoch is chosen by watching a validation metric — exactly the same kind of decision as choosing a learning rate or a weight-decay value. Making that choice by repeatedly checking the out-of-time test set turns that set into a de facto validation set, and whatever AUC it reports afterward is no longer an unbiased estimate of how the model will perform once deployed. Option A is the tem",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit6#lesson-1": [
    {
      "stem": "True or false: a network built entirely from conv layers, with no pooling, no stride, and no global-average-pool, is fully translation-invariant — a lesion in the corner of a photo and the same lesion in the center produce the exact same final feature vector.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Plain conv layers are equivariant, not invariant — shifting the input shifts where the activation lands in every feature map, all the way through the stack. Without an operation that explicitly discards spatial position (pooling, striding, or a final global-average-pool), the final feature map still encodes location, so a corner-lesion and a center-lesion photo produce differently-a",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That small reusable weight matrix is called a _____ (or filter).",
      "choices": [
        "reduce",
        "universal approximation theorem",
        "kernel",
        "epoch"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “kernel”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The result is a 2-D grid of dot-product outputs called a _____ , and it was produced by exactly 9 learned numbers, not 9 numbers per position.",
      "choices": [
        "feature map",
        "Global average pooling",
        "cell state",
        "tuning on the test set"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “feature map”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Convolution as local connectivity and weight sharing\" teaches?",
      "choices": [
        "The same set of predictions produces meaningfully different loss values depending which function you apply — the choice is a modeling decision, not a formality.",
        "Gradient accumulation fakes a larger batch without more peak activation memory ; activation checkpointing trades ~20–30% more compute for a large activation-memory reduction.",
        "LeCun's 1989 Bell Labs system is the historical bridge from Rumelhart, Hinton, and Williams's theoretical demonstration to a working, economically motivated ZIP-code reader.",
        "A conv kernel is a small, reusable set of learned weights (e.g. 3×3×C_in numbers) applied via a sliding dot product — this is what makes convolution cheap compared to a dense layer's one-weight-per-pixel-per-position scheme."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Convolution as local connectivity and weight sharing\" teaches?",
      "choices": [
        "Four gates, one job split four ways : forget (what to erase), input (what to write), candidate (what to propose), output (what to expose) — all sigmoid or tanh layers over [h_{t-1}, x_t] .",
        "Vanishing and exploding gradients are opposite failures of the same chain-rule product across layers — gradient clipping caps explosion by rescaling an over-large gradient norm, but it has no effect on a gradient that vanished fro",
        "Weight sharing, not invariance, is the mechanism. The same kernel is tried at every spatial position, so a pattern learned once is detected everywhere without separate training for each location.",
        "The loss you optimize (MSE, BCE — chosen for gradient behavior) and the metric you report (MAE in kWh, AUC — chosen for human interpretability) are different tools for different jobs, and treating them as interchangeable is a comm"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Convolution as local connectivity and weight sharing\" teaches?",
      "choices": [
        "Equivariance ≠ invariance: shifting the input shifts a conv layer's output correspondingly (equivariant); the output staying the same regardless of position (invariant) only emerges after pooling/global-aggregation is stacked on t",
        "The additive cell-state update c_t = f_t⊙c_{t-1} + i_t⊙c̃_t replaces repeated matrix multiplication with elementwise gating, which is the actual mechanism that lets gradients survive across long ICU stays.",
        "The loss you optimize (MSE, BCE — chosen for gradient behavior) and the metric you report (MAE in kWh, AUC — chosen for human interpretability) are different tools for different jobs, and treating them as interchangeable is a comm",
        "Every node needs only its local gradient , evaluated at the forward-pass values it saw; the multivariable chain rule sums contributions when a value feeds multiple downstream paths."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A wheat-rust pustule cluster sits near the top-left of one field photo, and the same cluster (same lighting, same crop) sits 20 pixels further right in a second photo taken from a slightly different angle. Which best describes what a single 3×3 conv layer, with no pooling or stride, does across these two photos?",
      "choices": [
        "The output feature map is identical in both cases, because the kernel's weights are shared across positions.",
        "The activation pattern for the pustule shifts by roughly 20 pixels in the output feature map, but its shape and strength are otherwise the same — translation equivariance",
        "The layer fails to detect the pustule in the second photo, since its weights were learned around the first photo's position.",
        "The layer becomes fully translation-invariant after this one pass, so no further pooling is needed downstream."
      ],
      "correct": 1,
      "explain": "Weight sharing means the same kernel is tried at every position, so wherever the pustule pattern appears, the kernel fires — but the firing shows up at the corresponding shifted location in the output map. That relocation-but-preserved-form behavior is exactly what \"translation equivariant\" means. A is the tempting wrong answer: it confuses weight sharing (same weights applied everywhere) with inv",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit6#lesson-2": [
    {
      "stem": "Fill the blank: _____ is the number of extra pixel rows/columns of (usually zero-valued) border added around an input before a kernel slides over it.",
      "choices": [
        "Padding",
        "SMOTE",
        "Seq-to-seq",
        "batch"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Padding”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is the number of pixels the kernel jumps between one application and the next.",
      "choices": [
        "gates",
        "Stride",
        "biases",
        "skip connection"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Stride”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is a fixed, non-learned downsampling operation — most commonly taking the max or the average over a small window.",
      "choices": [
        "gradient",
        "mask",
        "Mini-batch gradient descent",
        "Pooling"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Pooling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ adds just enough zero border so that, at stride 1, the output spatial size equals the input spatial size (for odd kernel sizes like 3×3 or 5×5, that's P = (K−1)/2 pixels on each side).",
      "choices": [
        "Sample weighting",
        "gradient clipping",
        "Cosine annealing",
        "Same padding"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Same padding”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Padding, stride, pooling, and receptive fields\" teaches?",
      "choices": [
        "The output-size formula floor((H + 2P − K)/S) + 1 lets you check every layer's shape by hand — treat a shape mismatch as an arithmetic bug to find, not a mystery to debug by trial and error.",
        "GRU trades the separate cell state and two of the four gates for ~25% fewer parameters ; empirically it ties LSTM on most tasks and only meaningfully trails on the longest-range dependencies.",
        "Reduction (mean vs. sum) rescales the gradient the optimizer sees; mean keeps loss magnitude stable across batch sizes, sum doesn't — this is why mean is the default and why the choice is coupled to learning rate.",
        "Nesterov's look-ahead mostly pays off at large β or near sharp curvature changes — foot-contact events, object-contact events — not on smooth, static bowls where it's nearly indistinguishable from classical momentum."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Padding, stride, pooling, and receptive fields\" teaches?",
      "choices": [
        "The loss you optimize (MSE, BCE — chosen for gradient behavior) and the metric you report (MAE in kWh, AUC — chosen for human interpretability) are different tools for different jobs, and treating them as interchangeable is a comm",
        "Stride, not kernel size, controls how much a layer downsamples; \"same\" padding just keeps the kernel itself shape-neutral at stride 1 so stride alone determines the shrink factor.",
        "Weight sharing, not invariance, is the mechanism. The same kernel is tried at every spatial position, so a pattern learned once is detected everywhere without separate training for each location.",
        "The update rule is always θ ← θ − η∇L(θ) — batch, stochastic, and mini-batch gradient descent differ only in how much data is averaged into ∇L(θ) before each step."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Fill in the missing line so this receptive-field tracker matches the formula from Lesson 2 ( RF_out = RF_in + (K−1)·jump_in , jump_out = jump_in · S ):",
      "choices": [
        "rf_in + (K - 1) * jump_in",
        "rf_in * K * S",
        "rf_in + K * jump_in",
        "(rf_in + K - 1) * S"
      ],
      "correct": 0,
      "explain": "Each additional kernel element beyond the first ( K − 1 of them) extends the receptive field outward by however many original-image pixels one step at the current layer corresponds to ( jump_in ) — that's exactly rf_in + (K - 1) * jump_in . Option C is the tempting distractor: it uses the full kernel size K instead of K − 1 , which double-counts the first kernel element's contribution (it's alread",
      "difficulty": "hard"
    },
    {
      "stem": "Why have many modern CNN designs replaced max-pooling with stride-2 convolutions for downsampling?",
      "choices": [
        "Because pooling layers have far more parameters than a strided conv, so removing them shrinks the model.",
        "Because a strided conv can learn which combination of input values to preserve while downsampling, instead of always applying a fixed max/average rule.",
        "Because pooling layers cannot change the spatial resolution of a feature map at all.",
        "Because strided convolutions are translation-invariant while pooling layers are not."
      ],
      "correct": 1,
      "explain": "Pooling applies the same non-learned rule (max or average) everywhere; a stride-2 conv has learnable weights, so the network can decide what's worth keeping as it downsamples, at the cost of added parameters and compute versus pooling. A is backwards and is the tempting distractor: pooling has zero learnable parameters, not more than a conv — replacing pooling with a strided conv adds parameters, ",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit6#lesson-3": [
    {
      "stem": "True or false: ResNet's skip connections primarily help by increasing the network's representational capacity — letting it represent more complex functions than a plain stack of the same depth could.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Skip connections primarily solve an optimization problem: they give gradients an unobstructed identity path back to early layers, which fixes the degradation problem where very deep plain stacks get harder to fit even on their own training set. A plain network of the same depth already has at least as much raw representational capacity (an identity mapping is a function a deep net c",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The workhorse unit of most modern CNNs is a three-step block: a convolution, then _____ (Unit 5's technique for keeping layer inputs on a well-behaved scale during training), then a ReLU nonlinearity.",
      "choices": [
        "Seq-to-seq",
        "batch normalization",
        "Tanh",
        "recurrent neural network"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “batch normalization”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The workhorse unit of most modern CNNs is a three-step block: a convolution, then batch normalization (Unit 5's technique for keeping layer inputs on a well-behaved scale during training), then a _____ nonlinearity.",
      "choices": [
        "Stride",
        "ReLU",
        "Adam",
        "Seq-to-seq"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “ReLU”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (GAP) sidesteps this entirely: instead of flattening, it averages each of the 256 channels' 7×7 spatial map down to one number, producing a 256-length vector directly, with zero learned parameters.",
      "choices": [
        "Label smoothing",
        "Global average pooling",
        "perceptron convergence theorem",
        "cell state"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Global average pooling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Assembling a working CNN\" teaches?",
      "choices": [
        "The conv-BN-ReLU block is the standard unit; halving spatial size while doubling channels at each downsampling step is a reasonable, common default, not a rule.",
        "Sample LR and weight decay log-uniformly ; sample bounded, roughly-linear quantities like dropout rate uniformly.",
        "The additive cell-state update c_t = f_t⊙c_{t-1} + i_t⊙c̃_t replaces repeated matrix multiplication with elementwise gating, which is the actual mechanism that lets gradients survive across long ICU stays.",
        "GPU memory is parameters + gradients + optimizer state + activations — Adam's two moment buffers make its optimizer-state cost alone roughly 2× parameter size, on top of gradients, for roughly 4× total versus plain SGD's 2×."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Assembling a working CNN\" teaches?",
      "choices": [
        "Lambda has no closed-form choice — sweep it on a log scale against a validation slice that resembles the scoring vintage, and watch for underfitting (both curves plateauing high) at the top of the range.",
        "Sample LR and weight decay log-uniformly ; sample bounded, roughly-linear quantities like dropout rate uniformly.",
        "Global average pooling replaces flatten+dense heads, cutting a would-be multi-million-parameter final layer down to zero-parameter pooling plus one small linear layer.",
        "Binary cross-entropy punishes confidently wrong probability predictions with unbounded loss — a critical property for a rare, costly event like a peak-demand trip."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Assembling a working CNN\" teaches?",
      "choices": [
        "Missingness should be encoded, never zero-filled : a per-channel mask plus a time-since-last-observed delta feature lets the model learn that a stale reading is informative rather than treating absence as a false physiological zer",
        "Batching replaces a Python loop with one matrix multiplication — 64 hourly readings become a (64, features) matrix, and every row is processed identically and independently.",
        "Weight sharing across timesteps ( W_xh , W_hh reused at every step) is what lets one architecture handle a 40-minute admission and a 9-day stay without changing parameter count.",
        "A conv layer's parameter count is K·K·C_in·C_out + C_out , and it scales with channel depth only — but the FLOPs to run that layer scale with channel depth and spatial size, so early (large-map) layers dominate compute while late "
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "This block is meant to take a 64-channel feature map in and produce a 128-channel feature map out, matching the pattern from Lesson 3. Running it raises: RuntimeError: running_mean should contain 64 elements not 128 . Find and fix the bug.",
      "choices": [
        "Change nn.BatchNorm2d(c_in) to nn.BatchNorm2d(c_out) — BatchNorm normalizes the conv's output, which has c_out channels, not the conv's input.",
        "Change kernel_size=3 to kernel_size=1 — the kernel size is causing the channel mismatch.",
        "Remove bias=False from the Conv2d call — the missing bias is what's breaking BatchNorm.",
        "Swap the order of Conv2d and BatchNorm2d so BatchNorm runs first."
      ],
      "correct": 0,
      "explain": "BatchNorm2d's argument is the number of channels it will receive , and it receives whatever the previous layer output — here, the Conv2d's c_out channels. Writing BatchNorm2d(c_in) configures it to expect the conv's input channel count instead, so its internal running-mean/running-variance buffers are sized for 64 channels when a 128-channel tensor actually arrives. C is the tempting distractor be",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit7#lesson-1": [
    {
      "stem": "Gradient clipping by global norm, applied during truncated BPTT on ICU sequences, is sufficient on its own to prevent the vanishing-gradient failure mode described in Lesson 1.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Gradient clipping rescales a gradient vector down when its norm exceeds a threshold — it only ever makes large gradients smaller. A vanishing gradient is already near zero, and clipping has nothing to rescale down; it does not add signal back. Clipping addresses the exploding-gradient side of the spectral-radius problem from Lesson 1, not the vanishing side, which needs an architect",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That's what a _____ is: instead of one big function of a fixed-size input, it's the same small function applied over and over, once per timestep, carrying a running summary — the hidden state — from one application to the next.",
      "choices": [
        "Label smoothing",
        "backpropagation through time",
        "Warm restarts",
        "recurrent neural network"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “recurrent neural network”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That's what a recurrent neural network is: instead of one big function of a fixed-size input, it's the same small function applied over and over, once per timestep, carrying a running summary — the _____ — from one application to the next.",
      "choices": [
        "batch",
        "Same padding",
        "unroll",
        "hidden state"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “hidden state”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: To train the recurrence you conceptually _____ it: draw a separate copy of the cell for each timestep, wire h_1 's output into h_2 's input and so on, and you get an ordinary (very deep) feedforward computation graph — one layer per hour of ICU stay.",
      "choices": [
        "ordered debugging protocol",
        "loss function",
        "unroll",
        "Layer normalization"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “unroll”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Recurrence and backpropagation through time\" teaches?",
      "choices": [
        "bf16 needs no loss scaling; fp16 does , because fp16's narrow exponent range lets small gradients underflow to zero — and both keep Adam's moment buffers and the master weight copy in fp32 regardless.",
        "The internal-covariate-shift explanation for batch norm was empirically undercut by Santurkar et al. (2018); the smoother, more predictable loss landscape it produces is the better-supported explanation for why it helps.",
        "The hidden state is a lossy, fixed-size summary of an arbitrary-length past — it replaces the fixed-window MLP's forced choice between truncation and padding noise.",
        "Per-parameter scaling exists because features fire at wildly different rates — a rarely-firing contact feature and an always-firing joint-angle feature cannot share one global learning rate without one of them being mistreated."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Recurrence and backpropagation through time\" teaches?",
      "choices": [
        "Weight sharing across timesteps ( W_xh , W_hh reused at every step) is what lets one architecture handle a 40-minute admission and a 9-day stay without changing parameter count.",
        "Model parallelism is only needed when one model copy doesn't fit on one GPU at batch size 1 — data parallelism is the correct default otherwise.",
        "Early layers learn generic edge and color-opponent detectors (useful for blight's necrotic edges, mosaic's chlorotic color shift); depth is what turns those primitives into disease-specific pattern detectors.",
        "L2-in-the-loss and weight decay are the same thing only under plain SGD. Under Adam, differentiating an L2 penalty gets it rescaled by the same per-parameter second-moment estimate as the data gradient — AdamW's decoupled decay av"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Recurrence and backpropagation through time\" teaches?",
      "choices": [
        "The loss you optimize (MSE, BCE — chosen for gradient behavior) and the metric you report (MAE in kWh, AUC — chosen for human interpretability) are different tools for different jobs, and treating them as interchangeable is a comm",
        "The additive cell-state update c_t = f_t⊙c_{t-1} + i_t⊙c̃_t replaces repeated matrix multiplication with elementwise gating, which is the actual mechanism that lets gradients survive across long ICU stays.",
        "Gradient accumulation fakes a larger batch without more peak activation memory ; activation checkpointing trades ~20–30% more compute for a large activation-memory reduction.",
        "BPTT stores every timestep's activations ; truncated BPTT trades gradient reach for a fixed memory budget by chunking the stay and carrying only the hidden state (not stored activations) across chunk boundaries."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Recurrence and backpropagation through time\" teaches?",
      "choices": [
        "1×1 convolutions mix channels with no spatial extent at all — useful as a cheap bottleneck around expensive 3×3 convs.",
        "Forgetting to gate dropout on a training flag is a silent bug , not a crash — it makes a deployed model's predictions nondeterministic for the same input, which is exactly the kind of defect a regulated scoring pipeline cannot tol",
        "The spectral radius of W_hh determines vanishing vs. exploding gradients — the same failure mode from Unit 3, now driven by sequence length instead of network depth.",
        "Vanishing and exploding gradients are opposite failures of the same chain-rule product across layers — gradient clipping caps explosion by rescaling an over-large gradient norm, but it has no effect on a gradient that vanished fro"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    }
  ],
  "course-1-deep-learning/unit7#lesson-2": [
    {
      "stem": "Fill the blank: A _____ cell (LSTM) is, at its core, a vanilla RNN cell plus a second pipe running alongside the hidden state — the cell state , c_t — and four small neural networks, called gates , that decide what flows into and out of that pipe.",
      "choices": [
        "unroll",
        "step function",
        "Long Short-Term Memory",
        "Step decay"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Long Short-Term Memory”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A Long Short-Term Memory cell (LSTM) is, at its core, a vanilla RNN cell plus a second pipe running alongside the hidden state — the _____ , c_t — and four small neural networks, called gates , that decide what flows into and out of that pipe.",
      "choices": [
        "Pooling",
        "cell state",
        "Stride",
        "loss curve"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “cell state”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A Long Short-Term Memory cell (LSTM) is, at its core, a vanilla RNN cell plus a second pipe running alongside the hidden state — the cell state , c_t — and four small neural networks, called _____ , that decide what flows into and out of that pipe.",
      "choices": [
        "step",
        "Dilation",
        "ReLU",
        "gates"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “gates”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ looks at the previous hidden state and the current vitals and decides, per dimension of the cell state, how much of the running memory to keep.",
      "choices": [
        "Class weighting",
        "tuning on the test set",
        "Seq-to-seq",
        "forget gate"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “forget gate”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Gated cells: LSTM and GRU\" teaches?",
      "choices": [
        "bf16 needs no loss scaling; fp16 does , because fp16's narrow exponent range lets small gradients underflow to zero — and both keep Adam's moment buffers and the master weight copy in fp32 regardless.",
        "Gradient shapes must match parameter shapes — this is the single cheapest correctness check available and catches the majority of hand-derivation and implementation bugs.",
        "Four gates, one job split four ways : forget (what to erase), input (what to write), candidate (what to propose), output (what to expose) — all sigmoid or tanh layers over [h_{t-1}, x_t] .",
        "The update rule is always θ ← θ − η∇L(θ) — batch, stochastic, and mini-batch gradient descent differ only in how much data is averaged into ∇L(θ) before each step."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Gated cells: LSTM and GRU\" teaches?",
      "choices": [
        "Vanishing and exploding gradients are opposite failures of the same chain-rule product across layers — gradient clipping caps explosion by rescaling an over-large gradient norm, but it has no effect on a gradient that vanished fro",
        "Label smoothing curbs overconfident probabilities , but at a 2% base rate the smoothing amount ε must be small (roughly 0.01–0.02) or the softened majority-class target will visibly bias the portfolio's average predicted default r",
        "Missingness should be encoded, never zero-filled : a per-channel mask plus a time-since-last-observed delta feature lets the model learn that a stale reading is informative rather than treating absence as a false physiological zer",
        "The additive cell-state update c_t = f_t⊙c_{t-1} + i_t⊙c̃_t replaces repeated matrix multiplication with elementwise gating, which is the actual mechanism that lets gradients survive across long ICU stays."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Gated cells: LSTM and GRU\" teaches?",
      "choices": [
        "A high forget gate does not guarantee gradient survival — it makes it possible; a forget gate stuck near 0 still kills long-range signal, it just isn't the default failure mode anymore.",
        "Gradient accumulation fakes a larger batch without more peak activation memory ; activation checkpointing trades ~20–30% more compute for a large activation-memory reduction.",
        "Check the initial loss against ln(num_classes) before anything else — a flat loss at that exact value means zero learning signal, not slow learning, and points you at the forward pass or labels, not the optimizer.",
        "Skip connections exist to fix an optimization problem (gradient flow through many stacked layers), not a capacity problem — depth past a couple dozen plain conv layers gets harder to train, not just prone to overfit, which is why "
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A vanilla RNN trained on 9-day ICU stays fails to learn that a lactate value from day 1 predicts sepsis onset on day 9, even though the training data clearly contains that pattern. Which single change is most directly responsible for fixing this, and why?",
      "choices": [
        "Increase the hidden state size so it can store more information.",
        "Switch to an LSTM, whose additive cell-state update avoids the repeated multiplication by W_hh that causes the day-1 gradient to vanish by day 9.",
        "Add gradient clipping so the exploding gradient stops overwhelming the day-1 signal.",
        "Shrink the truncated-BPTT chunk size so the network sees day 1 more often."
      ],
      "correct": 1,
      "explain": "The described symptom — long-range signal that exists in the data but can't be learned — is the classic vanishing-gradient signature from Lesson 1, driven by repeated multiplication by W_hh over ~200 timesteps. The LSTM's additive cell-state path ( c_t = f_t⊙c_{t-1} + i_t⊙c̃_t ) is specifically what removes that repeated-multiplication decay. A is a tempting distractor because more capacity sounds",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit7#lesson-3": [
    {
      "stem": "Because packed sequences (or a correctly implemented mask) already stop the loss from counting padded timesteps, it's safe to let the hidden state keep recurring through the padded zeros for the rest of the batch's max length — the loss masking alone is sufficient to make training correct.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Masking the loss stops padded steps from contributing directly to the gradient, but a naively recurring hidden state still absorbs the fabricated padded inputs into h_t itself. For seq-to-one predictions in particular, the final hidden state used for prediction can end up reflecting hundreds of hours of \"vitals are exactly zero\" rather than the patient's real last observed state — c",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The fix is a _____ : a same-length boolean (or 0/1) tensor marking which timesteps are real.",
      "choices": [
        "mask",
        "Stochastic gradient descent",
        "Pooling",
        "loss scaling"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “mask”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ takes the whole available history and produces a single prediction at the end — appropriate for a discharge-summary risk score computed once.",
      "choices": [
        "batch normalization",
        "Seq-to-one",
        "loss curve",
        "Mean Absolute Error"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Seq-to-one”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ maps a whole input sequence to a whole output sequence, generally with the output sequence a different length (this is the shape used for tasks like translation, not typically for streaming vitals).",
      "choices": [
        "saturation",
        "Seq-to-seq",
        "regularization strength",
        "batched forward propagation"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Seq-to-seq”.",
      "difficulty": "easy"
    },
    {
      "stem": "A colleague proposes using a bidirectional LSTM for the 6-hour-ahead sepsis prediction task, arguing that it consistently scores higher AUROC on the held-out test set than the unidirectional version. What is the correct response?",
      "choices": [
        "Adopt it — a higher AUROC on held-out data is the definitive measure of model quality, regardless of architecture.",
        "Reject it — the backward pass in a bidirectional model requires vitals from after each prediction point, meaning the reported AUROC reflects the model seeing the future i",
        "Adopt it, but only for retrospective research use, since the concern is purely about training speed, not validity.",
        "Reject it only if the forward and backward hidden states are concatenated rather than averaged."
      ],
      "correct": 1,
      "explain": "This is exactly the trap named in Lesson 3: a bidirectional model's higher score is not evidence of better modeling, it's evidence of information leakage, because the backward recurrence at hour t has already processed vitals from hours after t — data that would not exist yet at real deployment time. The \"hard requirement that the model never peek at the future\" makes this a correctness violation,",
      "difficulty": "hard"
    },
    {
      "stem": "This masked loss function is intended to ignore padded ICU timesteps, and it passes a quick sanity check where every sequence in the batch has the same true length. It silently gives wrong (scaled-down) loss values on any batch with sequences of mixed length. Find the bug.",
      "choices": [
        "The masking multiplication itself ( per_step * mask ) is wrong and should be a division.",
        "The normalization divides by batch_size × T (the padded shape) instead of mask.sum() (the actual count of real timesteps), so the whole loss is scaled down by the batch's",
        "np.clip should not be applied before masking.",
        "The bug is in the sign of the log terms."
      ],
      "correct": 1,
      "explain": "The numerator correctly zeroes out padded terms via per_step * mask , but the denominator still uses the full padded shape ( batch_size × T ) instead of mask.sum() , the true number of real timesteps. On a uniform-length batch, mask.sum() == batch_size × T , so the bug is invisible — which is exactly why it survives a same-length sanity check. On a mixed-length batch, the numerator sums over real ",
      "difficulty": "hard"
    },
    {
      "stem": "A 20-minute-old admission has no lactate draw yet. Which encoding of that missing lactate channel best follows the practice recommended in Lesson 3?",
      "choices": [
        "Set lactate to 0 for that timestep; zero is a safe neutral default for an unobserved lab value.",
        "Set lactate to the population mean lactate value, so the input distribution stays centered.",
        "Include a missingness flag for the lactate channel plus a time-since-last-observed feature, and leave the raw value however the pipeline naturally represents \"no reading.",
        "Drop the lactate channel from the model entirely for patients without an early draw."
      ],
      "correct": 2,
      "explain": "Lesson 3 is explicit that zero-fill (A) and mean-fill (B) are both a form of the same mistake: they hand the network a plausible-looking number with no way to distinguish \"this is the true value\" from \"this was never measured,\" which risks teaching the model a spurious relationship with whatever fill value was chosen. A mask-plus-delta encoding preserves the distinction and lets the network learn ",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit8#lesson-1": [
    {
      "stem": "Fill the blank: This is the central discipline this lesson teaches: an _____ , applied in a fixed sequence, that narrows the search space by an order of magnitude at each step instead of guessing.",
      "choices": [
        "sigmoid",
        "ordered debugging protocol",
        "output gate",
        "gates"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “ordered debugging protocol”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"A debugging methodology that actually finds the bug\" teaches?",
      "choices": [
        "AdaGrad's accumulator only grows , so effective learning rates decay to zero over a long run; RMSProp's EMA replaces the sum and stops that decay.",
        "Categorical cross-entropy generalizes BCE to multiple classes via softmax, and always needs the max-subtraction stability trick to avoid overflow in exp() .",
        "The hidden state is a lossy, fixed-size summary of an arbitrary-length past — it replaces the fixed-window MLP's forced choice between truncation and padding noise.",
        "Check the initial loss against ln(num_classes) before anything else — a flat loss at that exact value means zero learning signal, not slow learning, and points you at the forward pass or labels, not the optimizer."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"A debugging methodology that actually finds the bug\" teaches?",
      "choices": [
        "SMOTE manufactures synthetic minority rows by interpolating real defaulters' features , which can create bureau-attribute combinations no real applicant would have, and does nothing to address training-vs-scoring vintage shift.",
        "Parameter count per layer is n_in·n_out + n_out — arithmetic worth doing before training, since more parameters than labeled patient records is a memorization risk, not a capacity win.",
        "Overfitting one batch to near-zero loss is the single highest-value diagnostic — it rules out data-scale and generalization issues at once and isolates bugs to the forward pass, loss function, or label pipeline.",
        "Softmax plus cross-entropy collapses to p − y — one of the few places in deep learning where a seemingly complex derivative simplifies to something you can compute in your head."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"A debugging methodology that actually finds the bug\" teaches?",
      "choices": [
        "An epoch is a full pass over the data; a step is one update — with N training crops and batch size B, one epoch takes N/B steps, and this ratio is what \"overnight retraining\" throughput actually depends on.",
        "The bug taxonomy is ordered by frequency : label misalignment, un-shuffled data, forgotten eval() , leaked normalization stats, wrong reduction, silent broadcasting, and log(0)/exploding-gradient NaNs cover most real failures.",
        "Stacked linear layers collapse to one linear layer — W2(W1x+b1)+b2 always simplifies to a single W'x+b' , so nonlinearity is what makes depth meaningful, not optional decoration.",
        "Parameter count per layer is n_in·n_out + n_out — arithmetic worth doing before training, since more parameters than labeled patient records is a memorization risk, not a capacity win."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"A debugging methodology that actually finds the bug\" teaches?",
      "choices": [
        "Per-parameter scaling exists because features fire at wildly different rates — a rarely-firing contact feature and an always-firing joint-angle feature cannot share one global learning rate without one of them being mistreated.",
        "Bisect the pipeline like a commit range — swap in a trivial model, swap in random labels, disable augmentation — so each test halves the remaining search space instead of guessing at hyperparameters.",
        "SMOTE manufactures synthetic minority rows by interpolating real defaulters' features , which can create bureau-attribute combinations no real applicant would have, and does nothing to address training-vs-scoring vintage shift.",
        "The linear scaling rule ties batch size to peak lr : scale both together, and lengthen warmup to match, when you add parallel rollout workers."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A 3-D facies classifier over 12 lithology classes reports a training loss of 2.485, completely flat, for the first 30 epochs. What does this number, by itself, most strongly suggest?",
      "choices": [
        "The learning rate is too high and is causing divergence.",
        "-ln(1/12) ≈ 2.485 — the model is outputting a uniform distribution and has learned nothing since initialization.",
        "The model has converged to a sharp local minimum.",
        "Batch normalization statistics are leaking from validation into training."
      ],
      "correct": 1,
      "explain": "ln(12) ≈ 2.485 is exactly the cross-entropy loss of a uniform 12-class prediction. A flat loss sitting at that value for 30 epochs means no learning signal is reaching the parameters at all — the next step is the overfit-one-batch test, not a hyperparameter change. A is wrong because divergence from too-high LR produces a loss that increases or oscillates, not one that sits flat at exactly ln(num_",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit8#lesson-2": [
    {
      "stem": "Fill the blank: The order that works, built directly on Units 4 and 5: _____ — it interacts with everything else (the wrong LR makes every other setting look bad or good by accident) and its effect size dwarfs almost everything else you could tune.",
      "choices": [
        "learning rate first, always",
        "output gate",
        "1×1 convolution",
        "bias"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “learning rate first, always”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Then _____ , which on a terabyte-scale 3-D seismic volume is really a memory-and-throughput decision as much as an optimization one (Lesson 3 covers why).",
      "choices": [
        "Mean Absolute Error",
        "Adam",
        "max pooling",
        "batch size"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “batch size”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Then _____ — weight decay, dropout rate, augmentation intensity — tuned against the LR you've already fixed, since regularization and effective learning rate trade off against each other.",
      "choices": [
        "Forward-mode",
        "reduce",
        "receptive field",
        "regularization strength"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “regularization strength”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Only last, _____ choices: number of 3-D conv blocks, channel widths, whether to add the residual connections from Unit 5.",
      "choices": [
        "GPU memory",
        "batch",
        "multi-layer perceptron",
        "architecture"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “architecture”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Hyperparameter tuning on a real budget\" teaches?",
      "choices": [
        "Ill-conditioning is a ratio, not a size. A large condition number κ means the stability constraint on the steep direction and the progress rate on the shallow direction pull the single SGD learning rate in opposite directions — th",
        "Bisect the pipeline like a commit range — swap in a trivial model, swap in random labels, disable augmentation — so each test halves the remaining search space instead of guessing at hyperparameters.",
        "The shape contract is (batch, in_features) @ (in_features, units) → (batch, units) — the weight matrix's shape never depends on batch size, only on feature counts.",
        "Random search beats grid search on a fixed budget because most hyperparameters don't matter, and random search doesn't waste trials re-covering the ones that don't (Bergstra & Bengio, 2012)."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Hyperparameter tuning on a real budget\" teaches?",
      "choices": [
        "Tune in order: learning rate, then batch size, then regularization, then architecture — tuning out of order re-derives results a later stage invalidates.",
        "Batch norm's train/eval asymmetry — live batch statistics during training, a fixed running-average estimate at eval — means its effective behavior on a given applicant's row can differ from what was seen during training if running",
        "Broadcasting lets a (units,) bias vector add correctly to a (batch, units) pre-activation without a copy or a loop.",
        "The shape contract is (batch, in_features) @ (in_features, units) → (batch, units) — the weight matrix's shape never depends on batch size, only on feature counts."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Your team ran an ASHA sweep and found config B beats config A by 0.3% validation accuracy on one seed each. What is the correct next step before reporting config B as the winner to the client?",
      "choices": [
        "Ship config B immediately — 0.3% is a real, reportable improvement.",
        "Re-run config B on the held-out test set to confirm the gain.",
        "Re-run both configs A and B across several more seeds to check whether 0.3% exceeds normal run-to-run variance.",
        "Increase the ASHA keep-fraction and rerun the whole sweep."
      ],
      "correct": 2,
      "explain": "A single-seed 0.3% gap is well within the seed-variance range commonly seen on segmentation-style models (roughly 0.2–0.5 points). Multiple seeds per candidate are needed before treating a small gap as a genuine effect rather than noise. B is the second trap this lesson warns about: touching the test set during model selection — even just to \"confirm\" a winner before the final report — contaminate",
      "difficulty": "hard"
    },
    {
      "stem": "Complete the missing line so this ASHA-style loop actually discards the worse-performing configurations at each rung (lower validation loss is better).",
      "choices": [
        "scored.sort(key=lambda pair: pair[1])",
        "scored.sort(key=lambda pair: pair[1], reverse=True)",
        "random.shuffle(scored)",
        "scored.sort(key=lambda pair: pair[0])"
      ],
      "correct": 0,
      "explain": "Sorting ascending by validation loss ( pair[1] ) puts the best (lowest-loss) configs first, so slicing scored[:n_keep] keeps the survivors, exactly matching ASHA's early-kill rule. B sorts descending and would keep the worst configs after the same slice — the opposite of successive halving. D sorts by the config dict itself ( pair[0] ), which has no defined ordering and wouldn't reflect performanc",
      "difficulty": "hard"
    }
  ],
  "course-1-deep-learning/unit8#lesson-3": [
    {
      "stem": "Fill the blank: _____ , for training purposes, is the sum of four things that live on the device at once: the model parameters, their gradients, the optimizer's internal state, and the activations saved for the backward pass.",
      "choices": [
        "step",
        "GPU memory",
        "cell state",
        "Pooling"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “GPU memory”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Storing parameters and doing most math in _____ or bf16 instead of fp32 roughly halves parameter and activation memory and can substantially speed up matrix multiplies on tensor-core hardware.",
      "choices": [
        "vanishing gradient",
        "one-cycle",
        "Tanh",
        "fp16"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “fp16”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Storing parameters and doing most math in fp16 or _____ instead of fp32 roughly halves parameter and activation memory and can substantially speed up matrix multiplies on tensor-core hardware.",
      "choices": [
        "linear scaling rule",
        "bf16",
        "ordered debugging protocol",
        "Cosine annealing"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “bf16”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The standard fix is _____ — multiply the loss by a scale factor (say 1024, adjusted dynamically) before the backward pass so gradients land in fp16's representable range, then unscale the gradients before the optimizer step.",
      "choices": [
        "Cosine annealing",
        "loss scaling",
        "Tanh",
        "Batch gradient descent"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “loss scaling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Hardware, memory, and throughput\" teaches?",
      "choices": [
        "A loss function is just \"prediction + truth → one number,\" but which number depends entirely on which errors you want to punish harder.",
        "GPU memory is parameters + gradients + optimizer state + activations — Adam's two moment buffers make its optimizer-state cost alone roughly 2× parameter size, on top of gradients, for roughly 4× total versus plain SGD's 2×.",
        "Backprop is reverse-mode automatic differentiation applied to the forward computational graph — not a separate algorithm bolted onto the network, but the chain rule mechanized one node at a time.",
        "Forgetting to gate dropout on a training flag is a silent bug , not a crash — it makes a deployed model's predictions nondeterministic for the same input, which is exactly the kind of defect a regulated scoring pipeline cannot tol"
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Hardware, memory, and throughput\" teaches?",
      "choices": [
        "Adam's bias correction matters most at step 1 , where the uncorrected moments understate the true gradient by a factor tied directly to β1 and β2 — skipping it wastes the earliest, often most expensive, training steps.",
        "bf16 needs no loss scaling; fp16 does , because fp16's narrow exponent range lets small gradients underflow to zero — and both keep Adam's moment buffers and the master weight copy in fp32 regardless.",
        "An epoch is a full pass over the data; a step is one update — with N training crops and batch size B, one epoch takes N/B steps, and this ratio is what \"overnight retraining\" throughput actually depends on.",
        "Backprop is reverse-mode automatic differentiation applied to the forward computational graph — not a separate algorithm bolted onto the network, but the chain rule mechanized one node at a time."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A 60M-parameter 3-D segmentation model is trained with Adam in fp32. Roughly how does the combined memory of gradients plus Adam's optimizer state compare to the memory used by the parameters alone?",
      "choices": [
        "About the same (1×) — gradients and optimizer state are negligible.",
        "About 3× the parameter memory (1× gradients + 2× moment buffers).",
        "About 0.5× the parameter memory — Adam is more memory-efficient than plain SGD.",
        "It depends only on batch size, not on the optimizer."
      ],
      "correct": 1,
      "explain": "Gradients match parameter size (1×), and Adam keeps two parameter-shaped moment buffers, m and v (2×), for 3× the parameter memory in gradients and optimizer state combined — 4× total once parameters themselves are counted. C is backwards: Adam costs more memory than plain SGD (which only needs one momentum buffer, if any), not less — that's the direct tradeoff for Adam's per-parameter adaptive le",
      "difficulty": "hard"
    },
    {
      "stem": "A 3-D CNN training job on the shared cluster shows GPU utilization sitting at 22% throughout training, even though a quick profiling run confirms the forward and backward passes are fast. What is the most likely fix, and why doesn't switching to mixed precision address it?",
      "choices": [
        "Switch to bf16 — it will reduce activation memory and raise utilization.",
        "Add more dataloader worker processes and prefetch/cache decoded sub-volumes — the GPU is idle waiting on data, which mixed precision does nothing to fix since it only cha",
        "Increase the learning rate so each step makes more progress per batch.",
        "Switch from data parallelism to model parallelism to spread the I/O load."
      ],
      "correct": 1,
      "explain": "Low GPU utilization with a fast forward/backward pass is the signature of a data-loader bottleneck: the GPU finishes each step quickly and then sits idle waiting for the next batch of multi-gigabyte seismic sub-volumes to be read and preprocessed off shared storage. More worker processes, prefetching, and local caching address the actual bottleneck; mixed precision only speeds up on-device compute",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit1#lesson-1": [
    {
      "stem": "The term \"foundation model\" was coined by a 2021 Stanford (CRFM) report to describe a genuinely new training technique that did not exist before that publication.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. The report named a practice — large-scale pretraining followed by adaptation — that had already been standard since word2vec (2013), ELMo (2018), and BERT/GPT (2018–19). Critics specifically noted this, arguing the term was branding for an existing trend rather than a description of a new technique. The tempting reading is that a named term implies a new invention; Lesson 1 states d",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That criticism is worth taking seriously rather than dismissing as academic turf war: a good chunk of what makes \"_____\" feel like a new category is branding for a trend already well underway.",
      "choices": [
        "KV-cache",
        "foundation model",
        "Chinchilla",
        "FLAN"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “foundation model”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The first is _____ — not just parameter count, but scale across data, compute, and (usually) model size together, well beyond what any single downstream task could justify collecting or training for.",
      "choices": [
        "depth",
        "SentencePiece",
        "scale",
        "Total parameters"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “scale”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The second is _____ : the training objective is derived automatically from the raw data itself, with no human-authored labels (Lesson 3 unpacks this in depth).",
      "choices": [
        "self-supervision",
        "UniRef50",
        "Perplexity",
        "QLoRA"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “self-supervision”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"What makes a model \"foundational\"\" teaches?",
      "choices": [
        "InfoNCE is a softmax classification loss where the \"class\" for row i is index i itself — the similarity matrix's diagonal is the entire label structure.",
        "Domain shift and task shift are separate diagnoses — vocabulary and phrasing errors point to domain shift; consistent failures on negation and hedging (\"cannot exclude,\" \"no definite evidence of\") point to task shift that more raw",
        "\"Foundation model\" (Stanford CRFM, 2021) named a practice already three years old — critics rightly note the term is partly branding, but it does name a real, useful cluster of properties.",
        "Pick the family by the shape of the task : encoder-only for classification/retrieval over existing text, decoder-only for generation, encoder-decoder when input and output are distinct documents (contract in, risk memo out)."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"What makes a model \"foundational\"\" teaches?",
      "choices": [
        "Format overfitting, sycophancy, and capability regression outside the tuning mix are the three specific failure modes to check for after any instruction-tuning run — not just task accuracy on the tuning distribution itself.",
        "The three-stage recipe — SFT, then a Bradley-Terry reward model on preference pairs, then RL policy optimization — traces to Christiano et al. 2017 and was standardized by InstructGPT in 2022.",
        "The three defining ingredients are scale, self-supervision, and generality of representation — not parameter count alone. Generality is the property that actually earns the name.",
        "MQA and GQA cut the KV-cache by cutting kv_heads, not by shrinking the model — GQA with 4-8 groups is the standard middle ground between MQA's aggressive savings and full multi-head attention's quality."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"What makes a model \"foundational\"\" teaches?",
      "choices": [
        "In frozen feature extraction, the pretrained encoder never receives a gradient ; only the small head trains, which is what makes 400 labelled examples enough.",
        "RLAIF and Constitutional AI substitute a written set of principles for some human labeling, but a human-reviewed audit slice is still required for legally consequential answers.",
        "The character/word/subword spectrum is a three-way trade between vocabulary size, sequence length, and out-of-vocabulary rate — you cannot minimize all three at once.",
        "Homogenisation is the same fact viewed twice: shared backbones make adaptation cheap and lift every downstream task at once, and they propagate any shared blind spot into every downstream system at once."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which of the following is the property that most specifically distinguishes a \"foundation model\" from merely \"a large model trained on a lot of data\"?",
      "choices": [
        "It has more parameters than any prior model in its domain.",
        "Its training run required more GPU-hours than any prior model.",
        "Its internal representation is general enough to be useful for downstream tasks it never saw during training.",
        "It was trained using a transformer architecture rather than an LSTM."
      ],
      "correct": 2,
      "explain": "Scale and self-supervision are common ingredients, but the property that actually earns the name \"foundational\" is that the representation transfers to tasks the model was never trained on — a large model optimized end-to-end for one narrow task fails this even at huge scale. A and B describe scale alone, which Lesson 1 explicitly says is necessary but not sufficient — a large single-task model is",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit1#lesson-2": [
    {
      "stem": "Fill the blank: For protein language models, that corpus is typically _____ : a clustering of UniProt sequences at 50% identity, containing roughly 60 million representative sequences spanning essentially every organism that has ever been sequenced.",
      "choices": [
        "UniRef50",
        "KV-cache",
        "width",
        "in-batch negatives"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “UniRef50”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Treating the _____ as a reusable artifact rather than a one-off experimental result is the pivot point of the whole paradigm: it is the thing that gets adapted, cited, benchmarked, and built on top of, independent of whoever trained it or why.",
      "choices": [
        "checkpoint",
        "patient-level split",
        "foundation model",
        "word-level tokenizer"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “checkpoint”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (also called feature extraction) freezes the entire pretrained network, runs data through it to get fixed embeddings, and trains only a small linear or shallow classifier on top — this is the code example below.",
      "choices": [
        "WordPiece",
        "reward model",
        "Linear probing",
        "self-supervision"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Linear probing”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The pretrain-then-adapt pipeline\" teaches?",
      "choices": [
        "A straight log-log line is a local promise, not a law of nature — it holds over the compute range it was fit on and bends at data exhaustion, instability, or an irreducible entropy floor.",
        "A held-out eval needs hundreds of graded examples , not dozens, before a few-point difference between releases means anything statistically.",
        "The pipeline has five stages: corpus curation, objective choice, the pretraining run, the checkpoint as artifact, and adaptation — the first three happen once, adaptation happens over and over by different users.",
        "One head is one weighted average — it can't simultaneously attend strongly to a definition, a carve-out, and a liability cap without compromising between them. Multiple heads give each relationship its own subspace and softmax."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The pretrain-then-adapt pipeline\" teaches?",
      "choices": [
        "UniRef50's ~60M sequences illustrate corpus curation at pretraining scale: the work is deduplication and coverage, not labeling.",
        "Total parameters govern memory footprint; active parameters govern FLOPs per token — a model can have several times more total than active parameters, and that ratio is exactly what MoE is bought for.",
        "Attention cost is O(n²) in sequence length — 160,000 pairwise scores per head for a 400-clause contract at clause granularity, but billions at full 48,000-token resolution, which is why long-document transformers need more than br",
        "Weight tying reuses the input embedding matrix as the output projection , halving the cost of the two largest tensors and adding a mild regularizing effect, at some loss of representational flexibility."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The pretrain-then-adapt pipeline\" teaches?",
      "choices": [
        "DAPT's payoff is largest exactly when labelled data is scarce — it shifts the labels-versus-accuracy learning curve left, so 100 labelled examples after DAPT can rival 1,000 without it, because the vocabulary problem was already s",
        "The adaptation menu runs cheapest-to-priciest: prompting → linear probe → PEFT → full fine-tune each trade compute cost against accuracy and forgetting risk differently.",
        "Perplexity is exp(mean cross-entropy) and reads as an effective branching factor: a well-trained code model sits around 2–4, not near the vocabulary size.",
        "Homogenisation is the same fact viewed twice: shared backbones make adaptation cheap and lift every downstream task at once, and they propagate any shared blind spot into every downstream system at once."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A lab freezes a pretrained ESM-2 encoder, embeds 400 labelled sequences once, caches the vectors, and trains only a logistic regression head on those vectors. Which adaptation strategy from Lesson 2's menu is this?",
      "choices": [
        "Full fine-tuning",
        "Prompting",
        "Parameter-efficient fine-tuning (PEFT)",
        "Linear probing / feature extraction"
      ],
      "correct": 3,
      "explain": "This is the defining pattern of linear probing: the encoder's weights are frozen and never receive a gradient; only a small classifier trained on top of cached, fixed embeddings updates. Full fine-tuning (A) would update the encoder's own weights, not just a head. PEFT (C) would insert new trainable parameters into the frozen network rather than relying purely on a separate external head. Promptin",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit1#lesson-3": [
    {
      "stem": "Fill the blank: A _____ is a task manufactured from the raw data itself, with no external annotation, whose label is derived by a fixed, automatic rule rather than by a human expert.",
      "choices": [
        "UniRef50",
        "in-batch negatives",
        "pretext task",
        "Verbosity bias"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “pretext task”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is why corpus curation (deduplication, controlled diversity) and pretext-task design have to be considered together, not separately — a well-designed objective on a poorly curated corpus can still fail.",
      "choices": [
        "capacity",
        "Time-to-first-token",
        "position-wise feed-forward network",
        "Shortcut learning"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Shortcut learning”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Self-supervision: where labels come from when there are none\" teaches?",
      "choices": [
        "Perplexity is exp(mean cross-entropy) and reads as an effective branching factor: a well-trained code model sits around 2–4, not near the vocabulary size.",
        "UniRef50's ~60M sequences vs. the PDB's ~200k solved structures is the concrete ratio that makes supervised learning infeasible and self-supervision necessary.",
        "Weight tying reuses the input embedding matrix as the output projection , halving the cost of the two largest tensors and adding a mild regularizing effect, at some loss of representational flexibility.",
        "Query, key, and value are separate projections because they play conflicting roles — asking, advertising, and delivering content — for the same underlying token, and one vector can't optimize for all three geometries at once."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Self-supervision: where labels come from when there are none\" teaches?",
      "choices": [
        "Sliding-window, dilated, and axial-factorised attention, plus non-attention operators like GraphCast's GNN and FourCastNet's Fourier operator, are all responses to the same quadratic-cost arithmetic , each trading some global rece",
        "Homogenisation is the same fact viewed twice: shared backbones make adaptation cheap and lift every downstream task at once, and they propagate any shared blind spot into every downstream system at once.",
        "A pretext task manufactures its own label from the input by a fixed corruption rule — no human annotation, applicable to every sequence in the corpus for free.",
        "BPE and WordPiece both merge upward from characters but score candidate merges differently — raw co-occurrence frequency for BPE, a likelihood-improvement ratio for WordPiece."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Self-supervision: where labels come from when there are none\" teaches?",
      "choices": [
        "Storage and serving fail independently of training. Forty full checkpoints cost 40 × 14 GB = 560 GB on disk, and holding 40 resident copies for concurrent multi-tenant serving costs another 560 GB of GPU memory for weights alone.",
        "Bottleneck adapters, prefix tuning, and prompt tuning trade away some or all of LoRA's zero-overhead merge property for different parameter-count and quality trade-offs; IA³ keeps the foldability at an even smaller parameter count",
        "A good pretext task must be hard enough to force real structure to be learned — too easy or too random teaches nothing transferable.",
        "Feature extraction versus full fine-tuning is a data-size decision : below a few thousand labelled examples, freeze the backbone and train only a head; above it — 12,000 reports qualifies — full fine-tuning usually wins, provided "
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which pair of numbers correctly illustrates why supervised learning alone is \"dead on arrival\" for protein structure modeling?",
      "choices": [
        "~60M sequences in UniRef50 vs. ~200k solved structures in the PDB.",
        "~20 amino acid types vs. ~60M sequences in UniRef50.",
        "650M parameters in one ESM-2 checkpoint vs. 3B parameters in a larger one.",
        "15% masking rate vs. 400 labelled examples used for a linear probe."
      ],
      "correct": 0,
      "explain": "This is the ratio from Lesson 3: roughly 0.3% of sequences carry a solved-structure label, so a purely supervised approach would discard over 99.7% of the corpus. B, C, and D are all real numbers from the unit but answer different questions — B compares alphabet size to corpus size (unrelated to label scarcity), C compares two checkpoint sizes (an adaptation-cost trade-off, Lesson 2), and D descri",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit2#lesson-1": [
    {
      "stem": "Dividing the raw dot-product scores by √d_k before the softmax is necessary because, for query and key vectors with independent, mean-zero, unit-variance components, the variance of q·k grows linearly with d_k — so without scaling, the softmax would saturate more as head dimension increases.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 0,
      "explain": "Answer: True. The dot product is a sum of d_k independent terms, each with variance 1, so the total variance is d_k and the standard deviation is √d_k. Dividing by √d_k restores unit variance regardless of d_k, keeping the softmax's input scale — and therefore its gradient behavior — stable as head width changes. A tempting misconception is that the scaling is just \"normalizing to keep numbers sma",
      "difficulty": "easy"
    },
    {
      "stem": "Because self-attention is permutation-equivariant, a transformer with no position information at all would still correctly distinguish \"clause 3 defines Losses, and clause 287 uses the term\" from a shuffled version of the same contract with clauses 3 and 287 swapped in position.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Permutation-equivariance means the exact opposite: if you permute the input tokens, the attention outputs permute identically along with them, purely as a function of content-based matching. Without any injected position signal, the model has no way to represent \"comes before\" or \"comes after\" at all — every clause-ordering fact, including which clause is the definition and which is",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: This is why attention is best understood not as a sequence-processing trick but as _____ : given what clause 287 is currently trying to resolve, which of the other 399 clauses actually matter, and how much?",
      "choices": [
        "input/label shift",
        "Mixture of Experts",
        "content-based lookup",
        "regression suite"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “content-based lookup”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Scoring every query against every key is an n × n comparison, so the cost of one attention layer scales as _____ in sequence length.",
      "choices": [
        "O(n²)",
        "Mixture of Experts",
        "Encoder-only",
        "pretrain-finetune mismatch"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “O(n²)”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Self-attention from first principles\" teaches?",
      "choices": [
        "Multi-turn packing must track document boundaries and enforce them through the attention mask; for a multi-tenant deployment, a missing boundary between two tenants' packed conversations is a data-isolation failure, not just an ef",
        "Attention is direct lookup, not sequential compression. A token attends to every other token in one step, replacing the LSTM's relay race of 284 hidden-state updates between clause 3 and clause 287 with a single weighted read.",
        "d_head below roughly 64 starts hurting quality , which is why n_heads and d_model scale together rather than independently.",
        "A frozen regression suite of past failures , re-run every release, is the only defense against silently reopening a bug you already fixed."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Self-attention from first principles\" teaches?",
      "choices": [
        "Query, key, and value are separate projections because they play conflicting roles — asking, advertising, and delivering content — for the same underlying token, and one vector can't optimize for all three geometries at once.",
        "A straight log-log line is a local promise, not a law of nature — it holds over the compute range it was fit on and bends at data exhaustion, instability, or an irreducible entropy floor.",
        "Reward hacking is a predictable consequence of optimizing hard against any proxy metric, not a rare accident — it shows up as answers that score well on the reward model while getting the eligibility facts wrong.",
        "Word-level tokenizers fail on morphologically rich languages — German compounding and Turkish agglutination generate unbounded vocabularies, and whitespace assumptions fail outright on Japanese and Chinese."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Self-attention from first principles\" teaches?",
      "choices": [
        "MoE swaps one dense FFN for N experts plus a router that sends each token to only k of them, decoupling total capacity from per-token compute.",
        "A held-out eval needs hundreds of graded examples , not dozens, before a few-point difference between releases means anything statistically.",
        "The same content costs different numbers of tokens in different languages — roughly 1.4x for German and 2.5x for Japanese relative to English in common multilingual tokenizers — a direct consequence of training-corpus imbalance in",
        "The √d_k scaling is a variance correction, not a convention. A dot product of d_k independent unit-variance terms has variance d_k; dividing by √d_k restores unit variance so the softmax doesn't saturate as head width grows."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Why does a transformer layer learn three separate projections (query, key, value) instead of reusing one projected vector for all three roles?",
      "choices": [
        "Three projections are required so the layer has more trainable parameters, which always improves quality.",
        "Query, key, and value play conflicting roles for the same token — asking, being matched against, and supplying content — and one shared geometry can't optimize for all th",
        "It's purely a historical convention from the original paper with no functional benefit; a single shared projection produces identical results.",
        "Separate projections are needed only to allow multi-head attention; single-head attention needs just one projection."
      ],
      "correct": 1,
      "explain": "A query encodes what a token is looking for, a key encodes how a token advertises itself for matching, and a value is the content actually copied forward once a match is found. These are different jobs with different natural geometries, so a single vector reused for all three would force a compromise between them. A is wrong because parameter count isn't the reason — the three projections exist fo",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit2#lesson-2": [
    {
      "stem": "Fill the blank: _____ runs several independent attention computations — heads — in parallel on the same input, each with its own learned Q/K/V projections, and concatenates their outputs before a final linear mix.",
      "choices": [
        "checkpoint",
        "Multi-head attention",
        "layer normalization",
        "dropped"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Multi-head attention”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Each sub-layer is also paired with _____ , which rescales activations across the feature dimension to stabilize the distribution of values flowing into the next sub-layer.",
      "choices": [
        "layer normalization",
        "power law",
        "Mixture of Experts",
        "Verbosity bias"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “layer normalization”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Where the normalization sits relative to the residual matters more than it looks: the original 2017 design applied it after the residual sum ( _____ ): LayerNorm(x + sublayer(x)) .",
      "choices": [
        "post-LN",
        "TAPT",
        "Subword tokenization",
        "Encoder-only"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “post-LN”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ instead normalizes the sub-layer's input before it runs — x + sublayer(LayerNorm(x)) — leaving the residual stream itself untouched by any normalization.",
      "choices": [
        "width",
        "Pre-LN",
        "Mixture of Experts",
        "FLAN"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Pre-LN”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Multi-head attention and the full transformer block\" teaches?",
      "choices": [
        "Quantization degrades tail behavior first — precise thresholds, rare facts, multi-step reasoning — while average fluency survives; validate against a task eval set, not perplexity.",
        "Class imbalance needs an explicit fix , not just more data: weighted loss and stratified sampling, evaluated with per-class F1 rather than accuracy, since a 10:1 normal-to-pneumothorax ratio makes accuracy trivially gameable.",
        "One head is one weighted average — it can't simultaneously attend strongly to a definition, a carve-out, and a liability cap without compromising between them. Multiple heads give each relationship its own subspace and softmax.",
        "Legally consequential outputs need a human-reviewed eval slice in addition to automated judging, not as a replacement for it."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Multi-head attention and the full transformer block\" teaches?",
      "choices": [
        "Shortcut learning happens when a superficial regularity (like near-duplicate sequences) lets the model solve the pretext task without learning the intended structure — a reason corpus curation and objective design are linked, not ",
        "Full attention over a raw 0.25-degree grid is a non-starter — roughly 1.04 million tokens per snapshot puts a single head's attention matrix in the terabyte range; patchification brings it down to tens of thousands of tokens, and ",
        "Heads split d_model, they don't multiply it : 768 / 12 = 64-dimensional heads, via a reshape-transpose-attend-transpose-reshape pipeline, followed by an output projection W_O that lets heads' information interact.",
        "Layer-wise specialization is measurable, not folklore — a per-layer linear probe on frozen hidden states shows accuracy rising through the middle layers and often dipping at the very top, because the top layers are tuned to the pr"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Multi-head attention and the full transformer block\" teaches?",
      "choices": [
        "Attention cost is O(n²) in sequence length — 160,000 pairwise scores per head for a 400-clause contract at clause granularity, but billions at full 48,000-token resolution, which is why long-document transformers need more than br",
        "Legally consequential outputs need a human-reviewed eval slice in addition to automated judging, not as a replacement for it.",
        "Trained heads specialize measurably — positional, syntactic, and rare/defined-term tracking are documented patterns (Clark et al. 2019, Voita et al. 2019), and not every head is necessary (some are prunable).",
        "Contrastive objectives learn by comparison , pulling positive (docstring, function) pairs together and pushing every other in-batch pairing apart, rather than reconstructing corrupted input."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Why did pre-LN (normalizing a sub-layer's input before it runs, x + sublayer(LayerNorm(x)) ) become the default over post-LN ( LayerNorm(x + sublayer(x)) ) for very deep transformer stacks?",
      "choices": [
        "Pre-LN keeps the residual stream itself free of normalization, so the identity path through many stacked blocks stays linear and gradients don't have to pass through a no",
        "Pre-LN uses fewer parameters than post-LN, since it only normalizes half as often.",
        "Post-LN was discovered to be mathematically identical to pre-LN, so the switch was purely about code readability.",
        "Pre-LN removes the need for residual connections entirely, simplifying deep stacks."
      ],
      "correct": 0,
      "explain": "In post-LN, the normalization sits directly in the residual path, so the \"clean\" identity shortcut isn't actually clean — every block adds a normalization the gradient must pass through. Pre-LN normalizes only the sub-layer's input, leaving x + sublayer(...) as a true, unobstructed identity path, which is what made very deep (dozens of blocks) stacks trainable without careful warmup. B is wrong — ",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit2#lesson-3": [
    {
      "stem": "Fill the blank: Permute the input order and the entire set of outputs permutes identically along with it; attention is _____ .",
      "choices": [
        "merge",
        "WordPiece",
        "permutation-equivariant",
        "TAPT"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “permutation-equivariant”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A simpler alternative, _____ , just assigns each position index its own trainable vector, exactly like a token embedding table indexed by position instead of by word.",
      "choices": [
        "UniRef50",
        "reward model",
        "Position bias",
        "learned absolute position embeddings"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “learned absolute position embeddings”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Attention with Linear Biases) skips modifying Q and K altogether and instead adds a fixed, non-learned penalty directly to the attention scores: a bias of −m · (i − j) added to the score between positions i and j , growing linearly with distance.",
      "choices": [
        "Shortcut learning",
        "Grouped-query attention",
        "FLAN",
        "ALiBi"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “ALiBi”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ models (BERT is the canonical example) use no causal mask — every token attends bidirectionally to every other token in the same pass — because the goal is a rich contextual representation of text that already exists, not generating new text.",
      "choices": [
        "TAPT",
        "Encoder-only",
        "Feature extraction",
        "Chinchilla"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Encoder-only”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Position, masking, and the three architecture families\" teaches?",
      "choices": [
        "The embedding matrix has shape (vocab_size, d_model) and is looked up by index — mathematically equivalent to a one-hot matmul, but always implemented as a direct gather for efficiency.",
        "Query, key, and value are separate projections because they play conflicting roles — asking, advertising, and delivering content — for the same underlying token, and one vector can't optimize for all three geometries at once.",
        "A good pretext task must be hard enough to force real structure to be learned — too easy or too random teaches nothing transferable.",
        "Attention alone is permutation-equivariant — shuffle the input tokens and the outputs shuffle identically, which is exactly wrong for text where order (clause numbering, \"the foregoing\") carries meaning."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Position, masking, and the three architecture families\" teaches?",
      "choices": [
        "Sinusoidal encodings use multiple frequencies to give every position a unique fingerprint, and their sine/cosine structure lets relative offsets be expressed as linear transforms; learned absolute embeddings are simpler but can't ",
        "The KL penalty against the frozen reference policy is what keeps PPO from reward hacking; removing it can produce confidently wrong, fluent, on-brand answers within a few hundred training steps.",
        "Emergent abilities are real in some cases but Schaeffer et al. (2023) showed many \"sharp\" emergence curves are artifacts of a discontinuous metric (like exact-match) rather than a discontinuity in the model.",
        "The 10% random branch forces contextual verification everywhere , and the 10% unchanged branch forces it precisely because the model can't tell which real tokens are \"trustworthy\" from the token alone."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Position, masking, and the three architecture families\" teaches?",
      "choices": [
        "RoPE rotates Q/K by position so their dot product depends only on relative offset , which is why it extrapolates to longer sequences better than sinusoidal or learned absolute schemes; ALiBi achieves similar extrapolation with a s",
        "Full attention over a raw 0.25-degree grid is a non-starter — roughly 1.04 million tokens per snapshot puts a single head's attention matrix in the terabyte range; patchification brings it down to tens of thousands of tokens, and ",
        "Pre-LN beats post-LN at depth because it keeps the residual stream free of any normalization, giving deep stacks a clean identity path and removing the need for careful warmup schedules.",
        "The pipeline has five stages: corpus curation, objective choice, the pretraining run, the checkpoint as artifact, and adaptation — the first three happen once, adaptation happens over and over by different users."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A legal-tech team needs a model that reads all 400 clauses of a contract at once and outputs a binary label per clause — \"creates an indemnification obligation\" or not — with the full document available up front. Which architecture family fits best, and why?",
      "choices": [
        "Decoder-only, because causal masking is required for any classification task.",
        "Encoder-decoder, because the task has a separate input and output.",
        "Encoder-only, because the whole document is available at once and the task needs rich bidirectional context per clause, not text generation.",
        "None of the three families apply; classification requires a separate non-transformer architecture."
      ],
      "correct": 2,
      "explain": "Clause classification over an already-complete document benefits from every clause attending bidirectionally to every other clause — there's no \"future\" to hide, since nothing is being generated left to right. That's exactly the encoder-only setup (BERT-style), which produces per-token or per-clause representations for a downstream classifier head. A is backwards — causal masking is for generation",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit3#lesson-1": [
    {
      "stem": "Lowercasing (\"casefolding\") a multilingual product catalogue before tokenization is generally a safe, meaning-preserving normalization step.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Lowercasing destroys information in this domain: SKU and model-number case conventions carry meaning, and Turkish has a dotted i / dotless ı distinction that English-centric lowercasing logic (which assumes I → i ) gets wrong. It's tempting to think of lowercasing as purely cosmetic because it usually is for ordinary prose — but a catalogue mixing SKUs, model numbers, and Turkish te",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: At one extreme, a _____ splits every string into individual characters or bytes.",
      "choices": [
        "self-supervision",
        "Time-to-first-token",
        "ALiBi",
        "character-level tokenizer"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “character-level tokenizer”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: At the other extreme, a _____ splits on whitespace and punctuation and gives every distinct word its own token.",
      "choices": [
        "width",
        "Gradual unfreezing",
        "Weight tying",
        "word-level tokenizer"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “word-level tokenizer”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Whatever isn't in the vocabulary becomes an _____ (OOV) token, collapsed to a single <UNK> placeholder.",
      "choices": [
        "Weight tying",
        "FLAN",
        "Unigram",
        "out-of-vocabulary"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “out-of-vocabulary”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Why splitting text is harder than it looks\" teaches?",
      "choices": [
        "Temperature trades off signal against noise : τ → 0 overweights the hardest negative and produces noisy gradients; τ → ∞ flattens the softmax and the gradient vanishes.",
        "Loss must be masked with -100 on every system and user token and computed only on assistant-response tokens, including the role marker and terminator — training on prompt tokens dilutes gradient signal toward reconstructing input ",
        "MoE swaps one dense FFN for N experts plus a router that sends each token to only k of them, decoupling total capacity from per-token compute.",
        "The character/word/subword spectrum is a three-way trade between vocabulary size, sequence length, and out-of-vocabulary rate — you cannot minimize all three at once."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Why splitting text is harder than it looks\" teaches?",
      "choices": [
        "Auditability and drift detection are not optional on a legally consequential assistant — they are the deployment-time analog of the regression suite from Lesson 1.",
        "Word-level tokenizers fail on morphologically rich languages — German compounding and Turkish agglutination generate unbounded vocabularies, and whitespace assumptions fail outright on Japanese and Chinese.",
        "The 80/10/10 split closes the pretrain-finetune mismatch : pure [MASK] would teach the model to build good representations only for a token that never appears outside pretraining.",
        "Unigram prunes downward from a huge candidate vocabulary instead of merging upward, and uniquely supports probabilistic multi-segmentation of the same string."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Why splitting text is harder than it looks\" teaches?",
      "choices": [
        "The economic asymmetry — millions of GPU-hours once vs. hours per adaptation — is why checkpoints, not individual downstream results, became the field's primary reusable artifact.",
        "The UNK token is a silent information sink — collapsing distinct rare strings to one placeholder makes them indistinguishable to the model, which is why production tokenizers are built to avoid ever emitting it.",
        "The √d_k scaling is a variance correction, not a convention. A dot product of d_k independent unit-variance terms has variance d_k; dividing by √d_k restores unit variance so the softmax doesn't saturate as head width grows.",
        "TTFT and TPOT are separate user experiences driven by different levers — batching and speculative decoding trade one kind of latency and throughput against another, never all three for free."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A whitespace tokenizer is run over the Japanese title \"洗濯機用ステンレスホース\" (no spaces in the original). What is the most likely outcome?",
      "choices": [
        "The title splits cleanly into individual words.",
        "The entire title becomes a single token, since there is no whitespace to split on.",
        "The tokenizer throws an error because Japanese uses a non-Latin script.",
        "The title is automatically transliterated to Latin script before splitting."
      ],
      "correct": 1,
      "explain": "Whitespace tokenization can only split where whitespace exists. Japanese doesn't use whitespace between words, so the whole string is treated as one indivisible token — exactly the failure mode Lesson 1 opens with. Option A is the tempting distractor because it assumes the tokenizer has some awareness of word boundaries — it doesn't; whitespace splitting has no model of language, only of the space",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit3#lesson-2": [
    {
      "stem": "Byte-level BPE (as used in GPT-2) can still produce an UNK token when it encounters a character it has never seen during training, such as an emoji.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Byte-level BPE's base vocabulary is all 256 possible byte values, and every string in any encoding decomposes into some sequence of those bytes. An unseen emoji just costs more tokens (its UTF-8 bytes, individually or partially merged) — it is never unrepresentable. This is easy to confuse with character-level BPE, which operates over Unicode codepoints rather than bytes and can in ",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Google's _____ , used in BERT, runs the same merge-and-repeat loop as BPE but changes the criterion for which pair to merge.",
      "choices": [
        "WordPiece",
        "Encoder-only",
        "load-balancing loss",
        "Subword tokenization"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “WordPiece”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ algorithm (Kudo, 2018) inverts the direction entirely.",
      "choices": [
        "patient-level split",
        "Unigram",
        "KV-cache",
        "SentencePiece"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Unigram”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Kudo & Richardson, 2018) is not a fourth merge algorithm — it's an implementation of BPE or Unigram (your choice) that changes what the algorithm is allowed to see.",
      "choices": [
        "content-based lookup",
        "cross-entropy",
        "Active parameters",
        "SentencePiece"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “SentencePiece”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"BPE, WordPiece, Unigram, SentencePiece\" teaches?",
      "choices": [
        "Loss must be masked with -100 on every system and user token and computed only on assistant-response tokens, including the role marker and terminator — training on prompt tokens dilutes gradient signal toward reconstructing input ",
        "The UNK token is a silent information sink — collapsing distinct rare strings to one placeholder makes them indistinguishable to the model, which is why production tokenizers are built to avoid ever emitting it.",
        "Zero-initializing B (not A ) guarantees the adapted model starts identical to the base model while still receiving a gradient on B from step one, since ∂L/∂B depends on the nonzero A .",
        "BPE is a 1994 compression algorithm , not an ML invention — Sennrich et al. (2016) repurposed byte-pair merging to fix rare/compound-word handling in neural machine translation."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Byte-Pair Encoding was originally published in 1994 as a general-purpose algorithm, and was repurposed for neural machine translation by Sennrich et al. in 2016.",
      "choices": [
        "encryption",
        "compression",
        "parsing",
        "hashing"
      ],
      "correct": 1,
      "explain": "Philip Gage's original 1994 BPE replaced frequent adjacent byte pairs with new symbols to shrink data — a compression technique, not a language-modeling one, until Sennrich et al. adapted the merge loop for subword vocabularies. Encryption and hashing both transform data but for confidentiality or fixed-size fingerprinting, not size reduction, which is what BPE's merge loop actually does. Parsing ",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit3#lesson-3": [
    {
      "stem": "Fill the blank: An _____ is a single learned tensor of shape (vocab_size, d_model) — one row per token id, each row a dense vector of length d_model .",
      "choices": [
        "scale",
        "embedding matrix",
        "Fine-tuning",
        "UniRef50"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “embedding matrix”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is the decision to make these the literal same matrix (transposed for the output side) rather than two independently learned ones.",
      "choices": [
        "checkpoint",
        "Weight tying",
        "Task shift",
        "learning curve"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Weight tying”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A German sentence with the same meaning as an English one might run _____ the token count, a byproduct of compounding meaning fewer whole words survive as single tokens.",
      "choices": [
        "1.4x",
        "capacity",
        "out-of-vocabulary",
        "Feature extraction"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “1.4x”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Japanese, with no whitespace and a large, sparser-per-corpus character set, is worse — commonly cited multilingual tokenizer measurements put it around _____ the English token count for equivalent meaning.",
      "choices": [
        "ALiBi",
        "2.5x",
        "normalization",
        "foundation model"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “2.5x”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Embeddings: from token id to vector\" teaches?",
      "choices": [
        "The embedding matrix has shape (vocab_size, d_model) and is looked up by index — mathematically equivalent to a one-hot matmul, but always implemented as a direct gather for efficiency.",
        "A pretext task manufactures its own label from the input by a fixed corruption rule — no human annotation, applicable to every sequence in the corpus for free.",
        "Tens of millions of in-domain tokens is a reasonable target for continued pretraining to show clear gains; 200,000 report impressions (roughly 10 million tokens) sits comfortably in that useful range.",
        "Bottleneck adapters, prefix tuning, and prompt tuning trade away some or all of LoRA's zero-overhead merge property for different parameter-count and quality trade-offs; IA³ keeps the foldability at an even smaller parameter count"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Embeddings: from token id to vector\" teaches?",
      "choices": [
        "Embedding parameter cost scales linearly with vocabulary size — a 128k-vocab, d_model-4096 matrix is roughly 524M parameters, often the largest single tensor in a smaller model.",
        "A good pretext task must be hard enough to force real structure to be learned — too easy or too random teaches nothing transferable.",
        "Attention alone is permutation-equivariant — shuffle the input tokens and the outputs shuffle identically, which is exactly wrong for text where order (clause numbering, \"the foregoing\") carries meaning.",
        "Sinusoidal encodings use multiple frequencies to give every position a unique fingerprint, and their sine/cosine structure lets relative offsets be expressed as linear transforms; learned absolute embeddings are simpler but can't "
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A tied-weight embedding matrix of shape (128,000, 4,096) has approximately parameters, and this single matrix serves as both the input embedding and, transposed, the output projection.",
      "choices": [
        "4.1 million",
        "132 million",
        "512 million",
        "1.05 billion"
      ],
      "correct": 2,
      "explain": "128,000 × 4,096 = 524,288,000, roughly 524M parameters — and because the matrix is tied, that single count covers both the input lookup and the output logits projection. 1.05 billion is the untied total (roughly double, one matrix for input and a separate one for output) — the tempting distractor if you forget that tying means one matrix serves both roles rather than two independently sized ones.",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit4#lesson-1": [
    {
      "stem": "Fill the blank: This is _____ : at position i the model conditions on the real tokens 0..i from the training corpus, not on its own possibly-wrong guesses.",
      "choices": [
        "SentencePiece",
        "input/label shift",
        "Fine-tuning",
        "teacher forcing"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “teacher forcing”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The mechanical consequence of teacher forcing is the single most common implementation bug in this objective: the _____ .",
      "choices": [
        "Self-preference bias",
        "character-level tokenizer",
        "input/label shift",
        "post-LN"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “input/label shift”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: At each position, the model outputs a logit vector of size vocab_size ; softmax turns it into a probability distribution; the loss at that position is the negative log-probability the model assigned to the true next token — _____ .",
      "choices": [
        "Dilated attention",
        "Encoder-only",
        "cross-entropy",
        "Shortcut learning"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “cross-entropy”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is just this loss re-expressed on a scale that is easier to reason about: PPL = exp(L) .",
      "choices": [
        "Dilated attention",
        "Perplexity",
        "teacher forcing",
        "word-level tokenizer"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Perplexity”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Causal language modelling\" teaches?",
      "choices": [
        "CLM predicts token i+1 from tokens 0..i , using the causal mask from Unit 2 to prevent any position from seeing its own answer.",
        "Legally consequential outputs need a human-reviewed eval slice in addition to automated judging, not as a replacement for it.",
        "Merging BA into W removes all inference overhead but permanently binds one tenant's delta into the weights — exactly the outcome a shared 40-tenant deployment needs to avoid; production serving keeps adapters unmerged and batches ",
        "MLM exists because a causal model's early-token representations can't see later tokens — a real limitation for whole-function representations needed for search, not a limitation for generation."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Causal language modelling\" teaches?",
      "choices": [
        "The √d_k scaling is a variance correction, not a convention. A dot product of d_k independent unit-variance terms has variance d_k; dividing by √d_k restores unit variance so the softmax doesn't saturate as head width grows.",
        "Teacher forcing feeds the true prefix , not the model's own generations, which is what makes every position's loss independently computable in one parallel forward pass.",
        "The 80/10/10 split closes the pretrain-finetune mismatch : pure [MASK] would teach the model to build good representations only for a token that never appears outside pretraining.",
        "Bottleneck adapters, prefix tuning, and prompt tuning trade away some or all of LoRA's zero-overhead merge property for different parameter-count and quality trade-offs; IA³ keeps the foldability at an even smaller parameter count"
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Causal language modelling\" teaches?",
      "choices": [
        "k=2 is the standard because it's the cheapest k that gives the router a soft blend instead of one brittle hard choice — k=1 is faster but noisier to train, k>2 narrows the capacity-per-FLOP advantage that is the point of MoE.",
        "In frozen feature extraction, the pretrained encoder never receives a gradient ; only the small head trains, which is what makes 400 labelled examples enough.",
        "Class imbalance needs an explicit fix , not just more data: weighted loss and stratified sampling, evaluated with per-class F1 rather than accuracy, since a 10:1 normal-to-pneumothorax ratio makes accuracy trivially gameable.",
        "The input/label shift is tokens[:, :-1] vs. tokens[:, 1:] — the single most common CLM bug is getting this shift wrong or omitting it."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Causal language modelling\" teaches?",
      "choices": [
        "Few-shot prompting can beat fine-tuning below roughly a few thousand labelled examples ; above that crossover — where the 12,000-report radiology set sits — full fine-tuning (optionally DAPT-preceded) reliably wins and gives you a",
        "Attention is direct lookup, not sequential compression. A token attends to every other token in one step, replacing the LSTM's relay race of 284 hidden-state updates between clause 3 and clause 287 with a single weighted read.",
        "Perplexity is exp(mean cross-entropy) and reads as an effective branching factor: a well-trained code model sits around 2–4, not near the vocabulary size.",
        "T0 and FLAN (2021) established that instruction-formatted multitask fine-tuning generalizes to unseen tasks; InstructGPT (2022) extended this to open-ended assistance; LIMA (2023) showed 1,000 curated examples beat 50,000 scraped "
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    }
  ],
  "course-2-foundational-models/unit4#lesson-2": [
    {
      "stem": "Fill the blank: That's the _____ : a representation-quality gap caused by the model over-specializing to an artifact of the pretraining recipe.",
      "choices": [
        "regression suite",
        "scale",
        "pretrain-finetune mismatch",
        "serial"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “pretrain-finetune mismatch”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Masked language modelling and denoising\" teaches?",
      "choices": [
        "MoE swaps one dense FFN for N experts plus a router that sends each token to only k of them, decoupling total capacity from per-token compute.",
        "MLM exists because a causal model's early-token representations can't see later tokens — a real limitation for whole-function representations needed for search, not a limitation for generation.",
        "Quantization degrades tail behavior first — precise thresholds, rare facts, multi-step reasoning — while average fluency survives; validate against a task eval set, not perplexity.",
        "The √d_k scaling is a variance correction, not a convention. A dot product of d_k independent unit-variance terms has variance d_k; dividing by √d_k restores unit variance so the softmax doesn't saturate as head width grows."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Masked language modelling and denoising\" teaches?",
      "choices": [
        "The character/word/subword spectrum is a three-way trade between vocabulary size, sequence length, and out-of-vocabulary rate — you cannot minimize all three at once.",
        "A straight log-log line is a local promise, not a law of nature — it holds over the compute range it was fit on and bends at data exhaustion, instability, or an irreducible entropy floor.",
        "TTFT and TPOT are separate user experiences driven by different levers — batching and speculative decoding trade one kind of latency and throughput against another, never all three for free.",
        "The 80/10/10 split closes the pretrain-finetune mismatch : pure [MASK] would teach the model to build good representations only for a token that never appears outside pretraining."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Masked language modelling and denoising\" teaches?",
      "choices": [
        "Bottleneck adapters, prefix tuning, and prompt tuning trade away some or all of LoRA's zero-overhead merge property for different parameter-count and quality trade-offs; IA³ keeps the foldability at an even smaller parameter count",
        "The 10% random branch forces contextual verification everywhere , and the 10% unchanged branch forces it precisely because the model can't tell which real tokens are \"trustworthy\" from the token alone.",
        "In frozen feature extraction, the pretrained encoder never receives a gradient ; only the small head trains, which is what makes 400 labelled examples enough.",
        "Homogenisation is the same fact viewed twice: shared backbones make adaptation cheap and lift every downstream task at once, and they propagate any shared blind spot into every downstream system at once."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Masked language modelling and denoising\" teaches?",
      "choices": [
        "T5 span corruption masks contiguous spans with sentinel tokens and reframes reconstruction as sequence generation — a better match to code's syntactic, spanned structure than scattered single-token masking.",
        "Format overfitting, sycophancy, and capability regression outside the tuning mix are the three specific failure modes to check for after any instruction-tuning run — not just task accuracy on the tuning distribution itself.",
        "The ESM protein-language-model lineage is foundational precisely because a masked-residue objective — never mentioning structure — produces representations useful for structure, function, and design alike.",
        "DPO replaces the reward model and RL loop with a single supervised loss over the same log-probability ratios used in pretraining, at the cost of being limited to the coverage of its offline preference data."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Masked language modelling and denoising\" teaches?",
      "choices": [
        "The KV cache, not the weights, is usually the binding memory constraint at serving time for long conversations; paged attention manages it the way virtual memory manages RAM.",
        "FIM gets bidirectional-ish infilling out of a purely causal model via document rotation (prefix, suffix, middle) — no architecture change, just a reordering of the training document.",
        "Expert capacity limits, and the token-dropping they force under imbalance, are a real quality cost — MoE trades FLOPs for memory, serving complexity, and this dropping behavior, not a free capacity upgrade.",
        "A pretext task manufactures its own label from the input by a fixed corruption rule — no human annotation, applicable to every sequence in the corpus for free."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "You want a single causal, left-to-right decoder — not a separate bidirectional encoder — to autocomplete a function body in an IDE, using both the code already typed before the cursor and the code that already exists after the cursor (e.g., a later return statement). Which technique achieves this without adding bidirectional attention?",
      "choices": [
        "BERT-style 80/10/10 masking applied to the causal model's input.",
        "Fill-in-the-middle with document rotation: reorder training documents as prefix, suffix, middle, and train with ordinary next-token prediction.",
        "Lower the softmax temperature during generation so the model attends further ahead.",
        "Increase the effective batch size so in-batch negatives expose more context."
      ],
      "correct": 1,
      "explain": "FIM reorders the document so the suffix appears in the token sequence before the middle the model must generate — the causal mask and the CLM objective never change, but the model now conditions on tokens from both sides of the gap by the time it has to fill it in. Option A requires bidirectional attention to work at all (that's the premise of MLM), which contradicts \"without adding bidirectional ",
      "difficulty": "hard"
    },
    {
      "stem": "Complete the missing line so that this BERT-style masking function correctly implements the 80/10/10 split described in Lesson 2 (80% [MASK] , 10% random token, 10% left unchanged — all three still scored in labels ).",
      "choices": [
        "candidate & (choice >= 0.80)",
        "candidate & (choice >= 0.80) & (choice < 0.90)",
        "candidate & (choice < 0.10)",
        "~to_mask & candidate"
      ],
      "correct": 1,
      "explain": "The random-replacement bucket must be exactly the middle 10% of the corrupted positions — those with choice in [0.80, 0.90) — leaving the top 10% ( choice >= 0.90 ) as the \"left unchanged\" bucket. Both bounds are needed, or the random bucket would swallow the unchanged bucket too. Option A looks plausible but includes everything from 0.80 up to 1.0 (20% of candidates, not 10%), silently merging th",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit4#lesson-3": [
    {
      "stem": "Fill the blank: The loss most commonly used is _____ (used in SimCLR, CLIP, and code-search systems like CodeSearchNet-derived setups):",
      "choices": [
        "UniRef50",
        "LIMA",
        "power law",
        "InfoNCE"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “InfoNCE”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The τ ( _____ ) parameter rescales the similarity scores before the softmax.",
      "choices": [
        "Byte-level BPE",
        "Catastrophic forgetting",
        "Task shift",
        "temperature"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “temperature”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The negatives in the denominator above come from other pairs already in the same training batch — _____ — which is why effective batch size is the difficulty knob for this objective in a way it simply isn't for CLM or MLM.",
      "choices": [
        "Byte-level BPE",
        "in-batch negatives",
        "load-balancing loss",
        "scale"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “in-batch negatives”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The negatives in the denominator above come from other pairs already in the same training batch — in-batch negatives — which is why _____ for this objective in a way it simply isn't for CLM or MLM.",
      "choices": [
        "Full fine-tuning",
        "effective batch size is the difficulty knob",
        "time-per-output-token",
        "Gradual unfreezing"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “effective batch size is the difficulty knob”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Contrastive objectives\" teaches?",
      "choices": [
        "Legally consequential outputs need a human-reviewed eval slice in addition to automated judging, not as a replacement for it.",
        "Full fine-tuning of a 7B model costs ≈112 GB during training — fp32 master weights, bf16 weights, bf16 gradients, and two fp32 Adam moment buffers — which does not fit on a single 80 GB card even before activations.",
        "Weight tying reuses the input embedding matrix as the output projection , halving the cost of the two largest tensors and adding a mild regularizing effect, at some loss of representational flexibility.",
        "Contrastive objectives learn by comparison , pulling positive (docstring, function) pairs together and pushing every other in-batch pairing apart, rather than reconstructing corrupted input."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "You're building a search index over 40 million functions scraped from public repositories: given a natural-language query, return the best-matching function. You need embeddings such that true (query, function) matches are close and everything else is far, checked against millions of candidates at query time. Which pretraining objective s",
      "choices": [
        "Causal language modelling, then take the last hidden state as the embedding.",
        "BERT-style masked language modelling on each side independently, with no shared training signal between the two encoders.",
        "A contrastive objective (InfoNCE) trained jointly over (docstring, function) pairs.",
        "Span corruption with sentinel tokens, generating the function from the docstring."
      ],
      "correct": 2,
      "explain": "Retrieval at this scale needs an embedding space explicitly optimized so that true matches are close and everything else is far under a fast similarity operation (cosine/dot product) — that is exactly what InfoNCE trains for, and a dual encoder lets you embed all 40 million functions once, offline. Option A produces representations optimized for predicting the next token, not for being compared to",
      "difficulty": "hard"
    },
    {
      "stem": "Raising the InfoNCE temperature τ toward infinity makes the loss focus more sharply on the hardest negative in the batch (the highest-similarity wrong function for a given docstring).",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "It's the opposite. As τ → 0, dividing similarities by a tiny number amplifies differences between them, so the softmax sharpens toward whichever candidate has the single highest score — that's when the hardest negative dominates the gradient. As τ → ∞, dividing by a huge number crushes all similarities toward the same value, the softmax flattens toward uniform, and the gradient signal vanishes. It",
      "difficulty": "hard"
    },
    {
      "stem": "During contrastive pretraining of your docstring/function dual encoder, both embedding towers converge to output nearly identical vectors regardless of input, and training loss stays suspiciously low. Which combination of causes and fixes is most consistent with this failure?",
      "choices": [
        "This is expected behavior once InfoNCE converges — it's a sign of a well-trained encoder, not a bug.",
        "Representation collapse — likely from a too-small or too-uniform negative pool and/or missing embedding normalization; fix with L2-normalized embeddings, a larger and mor",
        "The causal mask from Unit 2 is misconfigured, letting the decoder see future tokens; fix by re-checking the attention mask.",
        "The tokenizer from Unit 3 has an unresolved out-of-vocabulary bug; fix by increasing the BPE merge count."
      ],
      "correct": 1,
      "explain": "Mapping every input to nearly the same vector is the textbook signature of representation collapse: if negatives are scarce, easy to tell apart trivially, or embeddings aren't normalized (letting norm inflation game the loss), the model can drive the loss down without learning a meaningful embedding geometry at all. The standard fixes are exactly normalization, negative pool size/diversity, and te",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit5#lesson-1": [
    {
      "stem": "Fill the blank: Two years later, Jordan Hoffmann and the DeepMind team behind the paper nicknamed _____ re-ran the experiment more carefully and overturned the recommendation, not the method.",
      "choices": [
        "Chinchilla",
        "capacity",
        "pretrain-finetune mismatch",
        "TAPT"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Chinchilla”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The empirical finding underneath both papers is a _____ : loss L falls with compute C , parameters N , or data D as a constant times that quantity raised to a small negative exponent.",
      "choices": [
        "power law",
        "pretext task",
        "post-LN",
        "layer normalization"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “power law”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Scaling laws\" teaches?",
      "choices": [
        "Temperature trades off signal against noise : τ → 0 overweights the hardest negative and produces noisy gradients; τ → ∞ flattens the softmax and the gradient vanishes.",
        "Chinchilla corrected a methodology bug, not the existence of scaling laws — Kaplan's fixed learning-rate schedule across differing run lengths biased the fitted slope toward oversized models; the power-law relationship itself held",
        "InfoNCE is a softmax classification loss where the \"class\" for row i is index i itself — the similarity matrix's diagonal is the entire label structure.",
        "The KV cache, not the weights, is usually the binding memory constraint at serving time for long conversations; paged attention manages it the way virtual memory manages RAM."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Scaling laws\" teaches?",
      "choices": [
        "C ≈ 6ND comes from counting FLOPs per token : ~2N for the forward pass, ~4N more for the backward pass, giving 6N per token times D tokens.",
        "BPE is a 1994 compression algorithm , not an ML invention — Sennrich et al. (2016) repurposed byte-pair merging to fix rare/compound-word handling in neural machine translation.",
        "Attention alone is permutation-equivariant — shuffle the input tokens and the outputs shuffle identically, which is exactly wrong for text where order (clause numbering, \"the foregoing\") carries meaning.",
        "The 80/10/10 split closes the pretrain-finetune mismatch : pure [MASK] would teach the model to build good representations only for a token that never appears outside pretraining."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Scaling laws\" teaches?",
      "choices": [
        "Few-shot prompting can beat fine-tuning below roughly a few thousand labelled examples ; above that crossover — where the 12,000-report radiology set sits — full fine-tuning (optionally DAPT-preceded) reliably wins and gives you a",
        "The √d_k scaling is a variance correction, not a convention. A dot product of d_k independent unit-variance terms has variance d_k; dividing by √d_k restores unit variance so the softmax doesn't saturate as head width grows.",
        "Compute-optimal allocation solves N ≈ √(C/120) once you substitute the ~20-tokens-per-parameter ratio into C ≈ 6ND — a two-line calculation, not a grid search.",
        "Discriminative learning rates follow the layer-wise picture directly — lower layers move least, upper layers and the new head move most — and short schedules with warmup prevent the random head's early noisy gradients from destabi"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Scaling laws\" teaches?",
      "choices": [
        "A straight log-log line is a local promise, not a law of nature — it holds over the compute range it was fit on and bends at data exhaustion, instability, or an irreducible entropy floor.",
        "Expert capacity limits, and the token-dropping they force under imbalance, are a real quality cost — MoE trades FLOPs for memory, serving complexity, and this dropping behavior, not a free capacity upgrade.",
        "The character/word/subword spectrum is a three-way trade between vocabulary size, sequence length, and out-of-vocabulary rate — you cannot minimize all three at once.",
        "The three-stage recipe — SFT, then a Bradley-Terry reward model on preference pairs, then RL policy optimization — traces to Christiano et al. 2017 and was standardized by InstructGPT in 2022."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Scaling laws\" teaches?",
      "choices": [
        "Compute-optimal and inference-optimal are different objectives — a forecasting system queried every 6 hours forever should often under-shoot Chinchilla's N and over-shoot its D, as Llama's team argued.",
        "The character/word/subword spectrum is a three-way trade between vocabulary size, sequence length, and out-of-vocabulary rate — you cannot minimize all three at once.",
        "The multilingual token tax has real downstream costs : less usable context window and higher per-request price for languages the tokenizer represents less efficiently.",
        "RoPE rotates Q/K by position so their dot product depends only on relative offset , which is why it extrapolates to longer sequences better than sinusoidal or learned absolute schemes; ALiBi achieves similar extrapolation with a s"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "According to Hoffmann et al. 2022 (\"Chinchilla\"), what was the primary flaw in Kaplan et al. 2020's original scaling-law conclusions?",
      "choices": [
        "Power laws don't actually describe how loss falls with compute.",
        "Kaplan's team held the learning-rate schedule's decay length fixed across runs of different lengths, which systematically biased the fitted curves toward favoring larger ",
        "Kaplan's team didn't test models large enough to reveal the true trend.",
        "Kaplan's team ignored batch size entirely, which invalidated the compute axis."
      ],
      "correct": 1,
      "explain": "The power-law relationship itself held up under Chinchilla's more careful re-run — the problem was methodological, not conceptual. Fixing the learning-rate schedule bug shifted the optimal ratio to roughly 20 tokens per parameter, revealing that most large models of that era, including GPT-3, were over-parameterized relative to the data they'd been trained on. A is wrong because Chinchilla's whole",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit5#lesson-2": [
    {
      "stem": "Because a 0.25-degree global atmospheric grid tokenizes to roughly 1 million cells, GraphCast and similar weather-emulation models typically run full quadratic self-attention over the entire global grid at every layer.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. A single head's attention matrix over ~1.04 million tokens would need roughly 2.15 TB in bf16 — no accelerator holds that. GraphCast instead uses a graph neural network with local message-passing; Pangu-Weather restricts attention to local 3D windows; FourCastNet replaces attention with an Adaptive Fourier Neural Operator. All three exist specifically to avoid full quadratic attenti",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Before the attention bottleneck, there's a smaller, more mundane shape question: for a given parameter budget, how many layers ( _____ ) versus how wide should each layer be ( d_model , or width )?",
      "choices": [
        "Active parameters",
        "Linear probing",
        "Byte-level BPE",
        "depth"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “depth”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Before the attention bottleneck, there's a smaller, more mundane shape question: for a given parameter budget, how many layers ( depth ) versus how wide should each layer be ( d_model , or _____ )?",
      "choices": [
        "Pre-LN",
        "1.4x",
        "width",
        "vocabulary"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “width”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A second memory cost shows up specifically at inference (or during rollout, when a weather model autoregressively feeds its own 6-hour-ahead prediction back in as the next input): the _____ .",
      "choices": [
        "merge",
        "Subword tokenization",
        "layer normalization",
        "KV-cache"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “KV-cache”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Depth, width, context length, and the attention bottleneck\" teaches?",
      "choices": [
        "Storage and serving fail independently of training. Forty full checkpoints cost 40 × 14 GB = 560 GB on disk, and holding 40 resident copies for concurrent multi-tenant serving costs another 560 GB of GPU memory for weights alone.",
        "Emergent abilities are real in some cases but Schaeffer et al. (2023) showed many \"sharp\" emergence curves are artifacts of a discontinuous metric (like exact-match) rather than a discontinuity in the model.",
        "Sinusoidal encodings use multiple frequencies to give every position a unique fingerprint, and their sine/cosine structure lets relative offsets be expressed as linear transforms; learned absolute embeddings are simpler but can't ",
        "Full attention over a raw 0.25-degree grid is a non-starter — roughly 1.04 million tokens per snapshot puts a single head's attention matrix in the terabyte range; patchification brings it down to tens of thousands of tokens, and "
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Depth, width, context length, and the attention bottleneck\" teaches?",
      "choices": [
        "d_head below roughly 64 starts hurting quality , which is why n_heads and d_model scale together rather than independently.",
        "T0 and FLAN (2021) established that instruction-formatted multitask fine-tuning generalizes to unseen tasks; InstructGPT (2022) extended this to open-ended assistance; LIMA (2023) showed 1,000 curated examples beat 50,000 scraped ",
        "Heads split d_model, they don't multiply it : 768 / 12 = 64-dimensional heads, via a reshape-transpose-attend-transpose-reshape pipeline, followed by an output projection W_O that lets heads' information interact.",
        "UniRef50's ~60M sequences illustrate corpus curation at pretraining scale: the work is deduplication and coverage, not labeling."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Depth, width, context length, and the attention bottleneck\" teaches?",
      "choices": [
        "Compute-optimal and inference-optimal are different objectives — a forecasting system queried every 6 hours forever should often under-shoot Chinchilla's N and over-shoot its D, as Llama's team argued.",
        "Word-level tokenizers fail on morphologically rich languages — German compounding and Turkish agglutination generate unbounded vocabularies, and whitespace assumptions fail outright on Japanese and Chinese.",
        "Full fine-tuning of a 7B model costs ≈112 GB during training — fp32 master weights, bf16 weights, bf16 gradients, and two fp32 Adam moment buffers — which does not fit on a single 80 GB card even before activations.",
        "The KV-cache formula (2 · layers · kv_heads · d_head · seq · batch · bytes) is a direct extension of Course 1 Unit 8's GPU memory arithmetic — worth computing per deployment, not assumed."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A model has 24 layers, 16 attention heads, d_head = 64 (so d_model = 1,024), plain multi-head attention (kv_heads = heads), batch size 1, bf16 values (2 bytes), and a rollout sequence length of 65,536 tokens. Using KV-cache bytes = 2 · layers · kv_heads · d_head · seq_len · batch · bytes_per_value, the KV-cache size is closest to:",
      "choices": [
        "0.10 GB",
        "3.22 GB",
        "6.44 GB",
        "12.88 GB"
      ],
      "correct": 2,
      "explain": "2 × 24 × 16 × 64 × 65,536 × 1 × 2 = 6,442,450,944 bytes ≈ 6.44 GB. Option B (3.22 GB) is what you get if you drop the leading factor of 2 for storing both keys and values. Option D (12.88 GB) double-counts that factor. Option A is 64x too small, the kind of error that comes from using a much shorter sequence length (around 1,024) instead of the 65,536 specified.",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit5#lesson-3": [
    {
      "stem": "Training a MoE router with only the task loss (e.g. next-step forecast error) and no load-balancing auxiliary loss will typically still converge to routing tokens roughly evenly across experts, since gradient descent naturally spreads load to minimize total compute.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Without an explicit load-balancing signal, routers tend toward expert collapse: an expert that performs marginally better early in training gets routed slightly more tokens, receives more gradient updates as a result, and improves further — a rich-get-richer dynamic, not a self-correcting one. The load-balancing auxiliary loss (num_experts · Σ f_e · P_e) exists precisely because gra",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (MoE) replaces a transformer layer's single feed-forward network with several independent feed-forward networks — \"experts\" — plus a small router network that decides, per token, which experts should process that token.",
      "choices": [
        "effective batch size is the difficulty knob",
        "vocabulary",
        "Speculative decoding",
        "Mixture of Experts"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Mixture of Experts”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ counts every expert's weights, whether or not a given token used them — it determines how much memory the model needs to sit on disk or across a serving cluster.",
      "choices": [
        "Total parameters",
        "Verbosity bias",
        "vocabulary",
        "normalization"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Total parameters”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ counts only the shared components (attention, embeddings, router) plus the k experts a given token actually visited — it determines the FLOPs that token costs, and therefore inference latency and training compute per token.",
      "choices": [
        "depth",
        "Task shift",
        "Time-to-first-token",
        "Active parameters"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Active parameters”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Mixture of Experts\" teaches?",
      "choices": [
        "The embedding matrix has shape (vocab_size, d_model) and is looked up by index — mathematically equivalent to a one-hot matmul, but always implemented as a direct gather for efficiency.",
        "MoE swaps one dense FFN for N experts plus a router that sends each token to only k of them, decoupling total capacity from per-token compute.",
        "Full fine-tuning of a 7B model costs ≈112 GB during training — fp32 master weights, bf16 weights, bf16 gradients, and two fp32 Adam moment buffers — which does not fit on a single 80 GB card even before activations.",
        "Sliding-window, dilated, and axial-factorised attention, plus non-attention operators like GraphCast's GNN and FourCastNet's Fourier operator, are all responses to the same quadratic-cost arithmetic , each trading some global rece"
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Mixture of Experts\" teaches?",
      "choices": [
        "A frozen regression suite of past failures , re-run every release, is the only defense against silently reopening a bug you already fixed.",
        "A good pretext task must be hard enough to force real structure to be learned — too easy or too random teaches nothing transferable.",
        "Fine-tuning learning rates run 10–100x smaller than pretraining (roughly 1e-5 to 5e-5 versus 1e-4 to 5e-4) because a pretrained network needs small nudges, not the large exploratory steps a randomly initialized one requires.",
        "k=2 is the standard because it's the cheapest k that gives the router a soft blend instead of one brittle hard choice — k=1 is faster but noisier to train, k>2 narrows the capacity-per-FLOP advantage that is the point of MoE."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Mixture of Experts\" teaches?",
      "choices": [
        "Total parameters govern memory footprint; active parameters govern FLOPs per token — a model can have several times more total than active parameters, and that ratio is exactly what MoE is bought for.",
        "The KV cache, not the weights, is usually the binding memory constraint at serving time for long conversations; paged attention manages it the way virtual memory manages RAM.",
        "That result licenses freezing the base model and learning a small per-tenant delta instead of touching every parameter — the premise the rest of this unit builds on.",
        "Storage and serving fail independently of training. Forty full checkpoints cost 40 × 14 GB = 560 GB on disk, and holding 40 resident copies for concurrent multi-tenant serving costs another 560 GB of GPU memory for weights alone."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A climate-emulation MoE layer has 8 experts of 350M parameters each, plus 200M parameters of shared attention, embeddings, and router combined. Under top-2 routing, what are the active parameters used to process a single token (as opposed to the model's total parameter count)?",
      "choices": [
        "0.9B — 200M shared plus 2 × 350M for the two routed experts",
        "3.0B — every expert's parameters, whether or not this token used them",
        "2.8B — all 8 experts, excluding the shared components",
        "1.75B — the shared components plus half of every expert's parameters"
      ],
      "correct": 0,
      "explain": "Active parameters count only what a given token actually passes through: the always-on shared components (200M) plus the two experts top-2 routing selected (2 × 350M = 700M), for 900M total — this is what determines that token's FLOPs and latency. Option B (3.0B) is the model's total parameter count — every expert's weights, whether or not this token was routed there — which governs memory footpri",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit6#lesson-1": [
    {
      "stem": "Fill the blank: The two problems are different in kind: the model doesn't know the _____ of chest imaging, and separately, it doesn't know the task of turning hedged clinical prose into one of four labels — pneumothorax, effusion, nodule, normal.",
      "choices": [
        "capacity",
        "serial",
        "learned absolute position embeddings",
        "vocabulary"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “vocabulary”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The two problems are different in kind: the model doesn't know the vocabulary of chest imaging, and separately, it doesn't know the _____ of turning hedged clinical prose into one of four labels — pneumothorax, effusion, nodule, normal.",
      "choices": [
        "pretrain-finetune mismatch",
        "LIMA",
        "word-level tokenizer",
        "task"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “task”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Transformer language models show the same pattern, and it has been measured directly with _____ : freeze the pretrained encoder, take the hidden state at each layer, and train a small linear classifier on top of just that layer's frozen output.",
      "choices": [
        "probing classifiers",
        "time-per-output-token",
        "post-LN",
        "benchmark contamination"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “probing classifiers”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (also called the linear-probe or frozen-backbone approach) freezes every pretrained weight and trains only a new head — here, a 4-way softmax classifier — on top of the frozen final-layer (or pooled) representation.",
      "choices": [
        "Byte-level BPE",
        "KV-cache",
        "embedding matrix",
        "Feature extraction"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Feature extraction”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"What transfers, and what doesn't\" teaches?",
      "choices": [
        "Layer-wise specialization is measurable, not folklore — a per-layer linear probe on frozen hidden states shows accuracy rising through the middle layers and often dipping at the very top, because the top layers are tuned to the pr",
        "Auditability and drift detection are not optional on a legally consequential assistant — they are the deployment-time analog of the regression suite from Lesson 1.",
        "MoE swaps one dense FFN for N experts plus a router that sends each token to only k of them, decoupling total capacity from per-token compute.",
        "TTFT and TPOT are separate user experiences driven by different levers — batching and speculative decoding trade one kind of latency and throughput against another, never all three for free."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"What transfers, and what doesn't\" teaches?",
      "choices": [
        "T5 span corruption masks contiguous spans with sentinel tokens and reframes reconstruction as sequence generation — a better match to code's syntactic, spanned structure than scattered single-token masking.",
        "Dual encoders trained contrastively beat generative models for large-scale retrieval because they directly optimize the embedding geometry search depends on; guard against collapse with normalization, big/diverse negative pools, a",
        "The 10% random branch forces contextual verification everywhere , and the 10% unchanged branch forces it precisely because the model can't tell which real tokens are \"trustworthy\" from the token alone.",
        "Feature extraction versus full fine-tuning is a data-size decision : below a few thousand labelled examples, freeze the backbone and train only a head; above it — 12,000 reports qualifies — full fine-tuning usually wins, provided "
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"What transfers, and what doesn't\" teaches?",
      "choices": [
        "Heads split d_model, they don't multiply it : 768 / 12 = 64-dimensional heads, via a reshape-transpose-attend-transpose-reshape pipeline, followed by an output projection W_O that lets heads' information interact.",
        "Domain shift and task shift are separate diagnoses — vocabulary and phrasing errors point to domain shift; consistent failures on negation and hedging (\"cannot exclude,\" \"no definite evidence of\") point to task shift that more raw",
        "k=2 is the standard because it's the cheapest k that gives the router a soft blend instead of one brittle hard choice — k=1 is faster but noisier to train, k>2 narrows the capacity-per-FLOP advantage that is the point of MoE.",
        "Legally consequential outputs need a human-reviewed eval slice in addition to automated judging, not as a replacement for it."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A model fine-tuned on your 12,000 reports gets clean, unambiguous cases right (\"large left pleural effusion\" → effusion) but consistently mislabels \"cannot exclude a small nodule\" and \"no definite evidence of pneumothorax\" as positive findings. What is this evidence of?",
      "choices": [
        "Domain shift — the model hasn't seen enough radiology vocabulary.",
        "Task shift specific to hedging and negation — the model hasn't learned the logical scope of clinical qualifiers.",
        "Catastrophic forgetting of general English syntax.",
        "An overly large batch size during fine-tuning."
      ],
      "correct": 1,
      "explain": "The model clearly has the vocabulary — it gets unambiguous cases right — so this isn't a missing-word problem. The failure is specifically on negation and hedging scope, which is a task-shift issue: correctly mapping a passage's logical assertion (or denial) to a label. More in-domain vocabulary exposure won't fix a model that hasn't learned what \"cannot exclude\" or \"no definite evidence of\" do to",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit6#lesson-2": [
    {
      "stem": "Fill the blank: _____ is continued gradient-based training of a pretrained model's weights on a smaller, labelled, task-specific dataset, starting from the pretrained weights rather than a random initialization.",
      "choices": [
        "layer normalization",
        "Fine-tuning",
        "LIMA",
        "post-LN"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Fine-tuning”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ trains the new head first with the entire backbone frozen for a short warm-up phase, then unfreezes the top few backbone layers, then progressively more, rather than updating every layer from step one.",
      "choices": [
        "Self-preference bias",
        "DAPT",
        "Grouped-query attention",
        "Gradual unfreezing"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Gradual unfreezing”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The fix is a _____ : partition unique patient identifiers first, then assign every report from a given patient entirely to train, validation, or test — never split across them.",
      "choices": [
        "Grouped-query attention",
        "Gradual unfreezing",
        "patient-level split",
        "task"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “patient-level split”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Running a fine-tune that actually works\" teaches?",
      "choices": [
        "Contrastive objectives learn by comparison , pulling positive (docstring, function) pairs together and pushing every other in-batch pairing apart, rather than reconstructing corrupted input.",
        "DPO replaces the reward model and RL loop with a single supervised loss over the same log-probability ratios used in pretraining, at the cost of being limited to the coverage of its offline preference data.",
        "Fine-tuning learning rates run 10–100x smaller than pretraining (roughly 1e-5 to 5e-5 versus 1e-4 to 5e-4) because a pretrained network needs small nudges, not the large exploratory steps a randomly initialized one requires.",
        "That result licenses freezing the base model and learning a small per-tenant delta instead of touching every parameter — the premise the rest of this unit builds on."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Running a fine-tune that actually works\" teaches?",
      "choices": [
        "Layer-wise specialization is measurable, not folklore — a per-layer linear probe on frozen hidden states shows accuracy rising through the middle layers and often dipping at the very top, because the top layers are tuned to the pr",
        "Zero-initializing B (not A ) guarantees the adapted model starts identical to the base model while still receiving a gradient on B from step one, since ∂L/∂B depends on the nonzero A .",
        "Discriminative learning rates follow the layer-wise picture directly — lower layers move least, upper layers and the new head move most — and short schedules with warmup prevent the random head's early noisy gradients from destabi",
        "Chinchilla corrected a methodology bug, not the existence of scaling laws — Kaplan's fixed learning-rate schedule across differing run lengths biased the fitted slope toward oversized models; the power-law relationship itself held"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Fill in the blank so that reports from the same patient never appear in both the train and validation sets.",
      "choices": [
        "reports_df[\"label\"]",
        "reports_df.index",
        "reports_df[\"patient_id\"]",
        "reports_df[\"report_date\"]"
      ],
      "correct": 2,
      "explain": "groups=reports_df[\"patient_id\"] tells the splitter to keep every row sharing a patient ID entirely on one side of the split, which is exactly what a patient-level split requires. reports_df.index (B) would make every row its own group, which degenerates to a plain report-level split — the leakage bug the exercise is meant to fix. label (A) groups by finding type instead of patient, which doesn't p",
      "difficulty": "hard"
    },
    {
      "stem": "This fine-tuning setup for the 4-class report classifier trains without errors, but validation F1 on the minority classes (pneumothorax, effusion) never rises above near-zero even after several epochs. What's the bug?",
      "choices": [
        "The weights should be the raw class counts, not their inverse — this code already does that correctly, so the bug must be elsewhere.",
        "class_weights uses raw counts directly instead of their inverse, so the loss over-weights the already-dominant \"normal\" class instead of the rare findings.",
        "CrossEntropyLoss does not accept a weight argument at all.",
        "The bug is that sort_index() shuffles the labels randomly."
      ],
      "correct": 1,
      "explain": "Passing raw counts as weights (8400 for \"normal\") makes the loss penalize errors on the majority class more , not less — the opposite of what's needed to counter imbalance. The fix is to weight inversely to frequency, e.g. class_weights = 1.0 / torch.tensor(class_counts, dtype=torch.float32) (typically renormalized), so the loss compensates for pneumothorax and effusion being rare instead of ampli",
      "difficulty": "hard"
    },
    {
      "stem": "A team fine-tunes the full 12-layer encoder on the 12,000 reports at the pretraining learning rate (3e-4), for 15 epochs, with no warmup. Training and validation loss by epoch:",
      "choices": [
        "The model architecture is too small for the task; add more transformer layers.",
        "The learning rate is at pretraining scale with too many epochs and no early stopping, driving overfitting/forgetting on a small fine-tuning set — lower the learning rate ",
        "Validation loss rising while train loss falls is expected and requires no changes — just train longer.",
        "The class weights are miscalibrated, causing the rise in validation loss."
      ],
      "correct": 1,
      "explain": "The signature — training loss cruising to near zero while validation loss and macro-F1 peak early (epoch 3) and then steadily worsen — is the classic overfitting/forgetting curve from a learning rate that's too large for the small fine-tuning set, made worse by running far past the point where validation performance peaked. The fix is exactly Lesson 2's recipe: drop to a fine-tuning-scale rate (1e",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit6#lesson-3": [
    {
      "stem": "Because the pretrained encoder already contains useful general-language representations, fine-tuning on a new task should always use the same learning rate that was used during pretraining, to avoid wasting the pretrained model's capacity.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Fine-tuning should use a learning rate roughly 10–100x smaller than pretraining. The pretrained weights already encode a useful, delicately balanced representation; large pretraining-scale updates on top of that starting point risk catastrophic forgetting rather than \"using its capacity\" — they overwrite the very representation you're trying to build on. The intuitive-sounding logic",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (domain-adaptive pretraining) continues the original pretraining objective — masked language modeling, in an encoder like the one used here — on a large pool of unlabelled text from the target domain before any task-specific fine-tuning happens.",
      "choices": [
        "learning curve",
        "DAPT",
        "pretext task",
        "Chinchilla"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “DAPT”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (task-adaptive pretraining) does the same continued-MLM step but on the much smaller, unlabelled version of the task's own data — the 12,000 reports stripped of their labels — rather than a broad in-domain pool.",
      "choices": [
        "Drift detection",
        "word-level tokenizer",
        "Pre-tokenization",
        "TAPT"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “TAPT”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The more actionable question in practice is the _____ : how does labelled-set performance move as you go from 100 to 1,000 to 10,000 to 12,000 reports, with and without DAPT applied first?",
      "choices": [
        "SentencePiece",
        "task",
        "learning curve",
        "DAPT"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “learning curve”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Domain-adaptive pretraining and data efficiency\" teaches?",
      "choices": [
        "DAPT continues the original pretraining objective on unlabelled in-domain text before any labelled fine-tuning; TAPT does the same but on the unlabelled version of the task's own (smaller) dataset — the two are complementary, not ",
        "The KV cache, not the weights, is usually the binding memory constraint at serving time for long conversations; paged attention manages it the way virtual memory manages RAM.",
        "k=2 is the standard because it's the cheapest k that gives the router a soft blend instead of one brittle hard choice — k=1 is faster but noisier to train, k>2 narrows the capacity-per-FLOP advantage that is the point of MoE.",
        "The character/word/subword spectrum is a three-way trade between vocabulary size, sequence length, and out-of-vocabulary rate — you cannot minimize all three at once."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Domain-adaptive pretraining and data efficiency\" teaches?",
      "choices": [
        "Query, key, and value are separate projections because they play conflicting roles — asking, advertising, and delivering content — for the same underlying token, and one vector can't optimize for all three geometries at once.",
        "LoRA computes W' = W + (α/r)·BA ; freezing W means no fp32 master copy, gradient, or Adam state is ever allocated for the full-size matrix — only for the much smaller B and A .",
        "DAPT's payoff is largest exactly when labelled data is scarce — it shifts the labels-versus-accuracy learning curve left, so 100 labelled examples after DAPT can rival 1,000 without it, because the vocabulary problem was already s",
        "The multilingual token tax has real downstream costs : less usable context window and higher per-request price for languages the tokenizer represents less efficiently."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Domain-adaptive pretraining and data efficiency\" teaches?",
      "choices": [
        "BPE and WordPiece both merge upward from characters but score candidate merges differently — raw co-occurrence frequency for BPE, a likelihood-improvement ratio for WordPiece.",
        "A straight log-log line is a local promise, not a law of nature — it holds over the compute range it was fit on and bends at data exhaustion, instability, or an irreducible entropy floor.",
        "k=2 is the standard because it's the cheapest k that gives the router a soft blend instead of one brittle hard choice — k=1 is faster but noisier to train, k>2 narrows the capacity-per-FLOP advantage that is the point of MoE.",
        "Tens of millions of in-domain tokens is a reasonable target for continued pretraining to show clear gains; 200,000 report impressions (roughly 10 million tokens) sits comfortably in that useful range."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A hospital pilot has only 80 labelled report impressions so far, spread thin across all four finding categories, with 12,000 more to be labelled over the coming months. Which approach is most appropriate right now, and why?",
      "choices": [
        "Full fine-tuning of all 12 layers with discriminative learning rates — the same recipe as the final 12,000-report model.",
        "Domain-adaptive pretraining alone, with no supervised step, since 80 labels is too few to bother with.",
        "Few-shot prompting with a handful of example reports per class, since 80 labelled examples sits well below the labelled-data crossover where fine-tuning reliably wins.",
        "Feature extraction with a linear head trained on all 12 layers concatenated together, to maximize the information available to only 80 examples."
      ],
      "correct": 2,
      "explain": "At 80 labelled examples, both full fine-tuning and feature-extraction training risk instability or trivial memorization, and the crossover point where fine-tuning reliably outperforms prompting sits in the low thousands of labelled examples — well above 80. Few-shot prompting with a well-chosen handful of examples per class is the more appropriate tool at this data volume, with fine-tuning revisit",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit7#lesson-1": [
    {
      "stem": "Aghajanyan et al. (2020) found that larger pretrained language models require a higher intrinsic dimension — a larger-rank update — to reach 90% of full fine-tuning performance on a downstream task.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. The paper found the opposite: intrinsic dimension shrinks as the pretrained model gets larger. Bigger pretrained models need lower-rank updates to adapt, not higher-rank ones, because pretraining has already done more of the representational work. This is the specific result that licenses low-rank adaptation methods like LoRA scaling well to large models — if the relationship ran th",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Why full fine-tuning does not scale to 40 tenants\" teaches?",
      "choices": [
        "Full fine-tuning of a 7B model costs ≈112 GB during training — fp32 master weights, bf16 weights, bf16 gradients, and two fp32 Adam moment buffers — which does not fit on a single 80 GB card even before activations.",
        "Bottleneck adapters, prefix tuning, and prompt tuning trade away some or all of LoRA's zero-overhead merge property for different parameter-count and quality trade-offs; IA³ keeps the foldability at an even smaller parameter count",
        "Normalization (NFKC) fixes encoding inconsistency but casefolding actively destroys meaning in SKUs, model numbers, and Turkish's dotted/dotless i distinction — multilingual catalogue tokenizers generally skip lowercasing.",
        "Perplexity is exp(mean cross-entropy) and reads as an effective branching factor: a well-trained code model sits around 2–4, not near the vocabulary size."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Why full fine-tuning does not scale to 40 tenants\" teaches?",
      "choices": [
        "Without a load-balancing auxiliary loss, routers tend toward expert collapse — a rich-get-richer dynamic that leaves most experts undertrained, not toward the naturally even split intuition might suggest.",
        "UniRef50's ~60M sequences vs. the PDB's ~200k solved structures is the concrete ratio that makes supervised learning infeasible and self-supervision necessary.",
        "Discriminative learning rates follow the layer-wise picture directly — lower layers move least, upper layers and the new head move most — and short schedules with warmup prevent the random head's early noisy gradients from destabi",
        "Storage and serving fail independently of training. Forty full checkpoints cost 40 × 14 GB = 560 GB on disk, and holding 40 resident copies for concurrent multi-tenant serving costs another 560 GB of GPU memory for weights alone."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Why full fine-tuning does not scale to 40 tenants\" teaches?",
      "choices": [
        "Loss must be masked with -100 on every system and user token and computed only on assistant-response tokens, including the role marker and terminator — training on prompt tokens dilutes gradient signal toward reconstructing input ",
        "T5 span corruption masks contiguous spans with sentinel tokens and reframes reconstruction as sequence generation — a better match to code's syntactic, spanned structure than scattered single-token masking.",
        "Sinusoidal encodings use multiple frequencies to give every position a unique fingerprint, and their sine/cosine structure lets relative offsets be expressed as linear transforms; learned absolute embeddings are simpler but can't ",
        "Intrinsic-dimension results (Li et al. 2018; Aghajanyan et al. 2020) show the update fine-tuning needs is low-rank , and the required rank shrinks further as the base model gets larger."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Why full fine-tuning does not scale to 40 tenants\" teaches?",
      "choices": [
        "One transformer block at d_model=768 is ≈7.09M parameters — roughly 12·d_model², split about a third attention and two-thirds FFN.",
        "FIM gets bidirectional-ish infilling out of a purely causal model via document rotation (prefix, suffix, middle) — no architecture change, just a reordering of the training document.",
        "InfoNCE is a softmax classification loss where the \"class\" for row i is index i itself — the similarity matrix's diagonal is the entire label structure.",
        "That result licenses freezing the base model and learning a small per-tenant delta instead of touching every parameter — the premise the rest of this unit builds on."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Using the same mixed-precision recipe from Lesson 1 (fp32 master weights + bf16 weights + bf16 gradients + two fp32 Adam moments = 16 bytes/parameter), what is the closest full fine-tuning training-memory total for a 13B-parameter model?",
      "choices": [
        "≈ 26 GB",
        "≈ 104 GB",
        "≈ 208 GB",
        "≈ 416 GB"
      ],
      "correct": 2,
      "explain": "16 bytes/param × 13×10⁹ params = 208×10⁹ bytes ≈ 208 GB. 104 GB is what you'd get from only 8 bytes/param (for example, forgetting the two Adam moment buffers and counting only master weights + working weights + gradients) — a common shortcut that undercounts by exactly the Adam contribution. 416 GB would require 32 bytes/param, which double-counts something in the recipe.",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit7#lesson-2": [
    {
      "stem": "Fill the blank: A _____d adapter has quietly recreated the exact 40-full-copies problem Lesson 1 spent its whole argument eliminating.",
      "choices": [
        "Mixture of Experts",
        "merge",
        "Subword tokenization",
        "Gradual unfreezing"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “merge”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Together these let _____ fine-tune models far larger than a naive LoRA setup would allow on the same card — the original paper reported fine-tuning a 65B model on a single 48 GB GPU while matching full fine-tuning benchmark quality.",
      "choices": [
        "Full fine-tuning",
        "depth",
        "QLoRA",
        "Time-to-first-token"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “QLoRA”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"LoRA and the PEFT family\" teaches?",
      "choices": [
        "TTFT and TPOT are separate user experiences driven by different levers — batching and speculative decoding trade one kind of latency and throughput against another, never all three for free.",
        "LoRA computes W' = W + (α/r)·BA ; freezing W means no fp32 master copy, gradient, or Adam state is ever allocated for the full-size matrix — only for the much smaller B and A .",
        "A held-out eval needs hundreds of graded examples , not dozens, before a few-point difference between releases means anything statistically.",
        "Full attention over a raw 0.25-degree grid is a non-starter — roughly 1.04 million tokens per snapshot puts a single head's attention matrix in the terabyte range; patchification brings it down to tens of thousands of tokens, and "
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"LoRA and the PEFT family\" teaches?",
      "choices": [
        "Discriminative learning rates follow the layer-wise picture directly — lower layers move least, upper layers and the new head move most — and short schedules with warmup prevent the random head's early noisy gradients from destabi",
        "A good pretext task must be hard enough to force real structure to be learned — too easy or too random teaches nothing transferable.",
        "Zero-initializing B (not A ) guarantees the adapted model starts identical to the base model while still receiving a gradient on B from step one, since ∂L/∂B depends on the nonzero A .",
        "Homogenisation is the same fact viewed twice: shared backbones make adaptation cheap and lift every downstream task at once, and they propagate any shared blind spot into every downstream system at once."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"LoRA and the PEFT family\" teaches?",
      "choices": [
        "The character/word/subword spectrum is a three-way trade between vocabulary size, sequence length, and out-of-vocabulary rate — you cannot minimize all three at once.",
        "MLM exists because a causal model's early-token representations can't see later tokens — a real limitation for whole-function representations needed for search, not a limitation for generation.",
        "The input/label shift is tokens[:, :-1] vs. tokens[:, 1:] — the single most common CLM bug is getting this shift wrong or omitting it.",
        "Merging BA into W removes all inference overhead but permanently binds one tenant's delta into the weights — exactly the outcome a shared 40-tenant deployment needs to avoid; production serving keeps adapters unmerged and batches "
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"LoRA and the PEFT family\" teaches?",
      "choices": [
        "RoPE rotates Q/K by position so their dot product depends only on relative offset , which is why it extrapolates to longer sequences better than sinusoidal or learned absolute schemes; ALiBi achieves similar extrapolation with a s",
        "Contrastive objectives learn by comparison , pulling positive (docstring, function) pairs together and pushing every other in-batch pairing apart, rather than reconstructing corrupted input.",
        "QLoRA's three techniques — NF4 quantization, double quantization, paged optimizers — shrink the frozen base's footprint and smooth training-time memory spikes; they compose with LoRA rather than replace it.",
        "Few-shot prompting can beat fine-tuning below roughly a few thousand labelled examples ; above that crossover — where the 12,000-report radiology set sits — full fine-tuning (optionally DAPT-preceded) reliably wins and gives you a"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A colleague proposes: \"Fine-tune a LoRA adapter per tenant, then call merge() on each one and save the merged weights, so inference has zero LoRA overhead for every tenant.\" This looks right — merging genuinely does eliminate the low-rank matmul's latency. What breaks when this plan is deployed to serve all 40 tenants concurrently on the ",
      "choices": [
        "Nothing breaks; merged adapters are strictly better in every deployment scenario.",
        "Merging silently changes the model's numerical outputs even for unrelated inputs, corrupting every tenant's responses.",
        "Each merged model is now a full standalone weight matrix again, so serving 40 of them concurrently is back to needing 40 × 14 GB of resident GPU memory — the exact servin",
        "Merging requires retraining the adapter from scratch, so it cannot be applied after training completes."
      ],
      "correct": 2,
      "explain": "Merging is exact and correct per tenant — it's a legitimate latency win for a single dedicated deployment. The problem only appears at the 40-tenant serving stage: a merged adapter can no longer be hot-swapped against a shared frozen base, so each tenant needs its own resident copy of the full weight matrix again, reproducing the 560 GB serving wall from Lesson 1 instead of avoiding it. B is false",
      "difficulty": "hard"
    },
    {
      "stem": "Which QLoRA component is specifically responsible for preventing an out-of-memory crash when a training batch of unusually long support-conversation sequences causes a transient spike in optimizer-state memory?",
      "choices": [
        "NF4 quantization",
        "Double quantization",
        "Paged optimizers",
        "Rank selection"
      ],
      "correct": 2,
      "explain": "Paged optimizers use NVIDIA unified memory to automatically move optimizer states between GPU and CPU memory when a spike would otherwise overflow the card, then page them back — exactly the transient-spike scenario described. NF4 and double quantization both reduce the static footprint of the frozen base weights and their quantization constants — they don't respond to a training-time spike. Rank ",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit7#lesson-3": [
    {
      "stem": "If a packed training sequence contains conversation turns from two different tenants, correctly setting every system/user token's label to -100 is sufficient on its own to guarantee the strict per-tenant data-isolation requirement.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Loss masking controls which tokens contribute to the loss; it says nothing about which tokens a given position can attend to during the forward pass. Without a document-boundary enforced through the attention mask, a token from tenant B's conversation can still attend into tenant A's packed conversation earlier in the same sequence — the model's internal computation crosses tenants ",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Sanh et al.'s T0 and Wei et al.'s _____ both took a pretrained model and fine-tuned it — not on one task, but on dozens of NLP tasks at once, each one reformatted into a natural-language instruction and a response.",
      "choices": [
        "Pre-LN",
        "Fine-tuning",
        "FLAN",
        "input/label shift"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “FLAN”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Then Zhou et al.'s _____ (2023) delivered the result that matters most for a 40-tenant, human-limited support operation: 1,000 carefully curated instruction examples produced a model that beat one trained on 50,000 scraped, lower-quality examples.",
      "choices": [
        "self-supervision",
        "regression suite",
        "LIMA",
        "probing classifiers"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “LIMA”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: An instruction example is shaped with a _____ : special role markers — say, <|system|> , <|user|> , <|assistant|> , <|end|> — that turn a conversation into one flat token sequence a causal language model can be trained on.",
      "choices": [
        "Active parameters",
        "chat template",
        "Encoder-only",
        "dropped"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “chat template”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Instruction tuning\" teaches?",
      "choices": [
        "Emergent abilities are real in some cases but Schaeffer et al. (2023) showed many \"sharp\" emergence curves are artifacts of a discontinuous metric (like exact-match) rather than a discontinuity in the model.",
        "T0 and FLAN (2021) established that instruction-formatted multitask fine-tuning generalizes to unseen tasks; InstructGPT (2022) extended this to open-ended assistance; LIMA (2023) showed 1,000 curated examples beat 50,000 scraped ",
        "Quantization degrades tail behavior first — precise thresholds, rare facts, multi-step reasoning — while average fluency survives; validate against a task eval set, not perplexity.",
        "Chinchilla corrected a methodology bug, not the existence of scaling laws — Kaplan's fixed learning-rate schedule across differing run lengths biased the fitted slope toward oversized models; the power-law relationship itself held"
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Instruction tuning\" teaches?",
      "choices": [
        "Causal and padding masks both work by adding -∞ to forbidden score positions before the softmax , and compose by simple addition — a position needs to clear both to receive any attention weight.",
        "The pipeline has five stages: corpus curation, objective choice, the pretraining run, the checkpoint as artifact, and adaptation — the first three happen once, adaptation happens over and over by different users.",
        "UniRef50's ~60M sequences illustrate corpus curation at pretraining scale: the work is deduplication and coverage, not labeling.",
        "Loss must be masked with -100 on every system and user token and computed only on assistant-response tokens, including the role marker and terminator — training on prompt tokens dilutes gradient signal toward reconstructing input "
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Instruction tuning\" teaches?",
      "choices": [
        "Training is parallel across positions; generation is serial across tokens — the same objective that pretrains cheaply is expensive to sample from one token at a time.",
        "Multi-turn packing must track document boundaries and enforce them through the attention mask; for a multi-tenant deployment, a missing boundary between two tenants' packed conversations is a data-isolation failure, not just an ef",
        "A held-out eval needs hundreds of graded examples , not dozens, before a few-point difference between releases means anything statistically.",
        "The √d_k scaling is a variance correction, not a convention. A dot product of d_k independent unit-variance terms has variance d_k; dividing by √d_k restores unit variance so the softmax doesn't saturate as head width grows."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A teammate's instruction-tuning data pipeline for the telecom support model produces this labels tensor. Support tickets look correct in spot checks, but the fine-tuned model starts echoing customer complaints back nearly verbatim before answering them, and needs far more data than expected to learn the escalation policy. Find the bug.",
      "choices": [
        "The function should return input_ids unchanged, since labels and inputs are always identical in causal LM training.",
        "The function never masks the system and user tokens with -100 , so the model computes loss on — and learns to reproduce — the prompt tokens as well as the response.",
        "The bug is that assistant_start and assistant_end are unused parameters that should be deleted.",
        "The function should shift input_ids by one position before copying, or the model will never see next-token targets."
      ],
      "correct": 1,
      "explain": "labels is just a raw copy of input_ids with no masking at all, so cross-entropy loss is computed on every token, including the system prompt and the customer's own message. That matches the symptom exactly: the model partially learns to reproduce prompt content (echoing the complaint) and dilutes its gradient budget away from the assistant span, which is also why it needs more data than expected t",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit8#lesson-1": [
    {
      "stem": "True or false: because LLM judges are cheaper and faster than human raters, a single LLM-as-judge verdict — one call, one candidate order, one prompt — is generally sufficient to certify a model update for a legally consequential production use case like benefits eligibility.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Position bias, verbosity bias, and self-preference bias all mean a single unswapped verdict is unreliable on its own. At minimum you need order-swapped comparisons discarding non-transitive verdicts, and for legally consequential outputs a human-reviewed audit slice in addition. The tempting reasoning — \"cheaper and faster, so good enough\" — mistakes cost efficiency for validity; th",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A model can then score well by recognizing the specific test item rather than by possessing the underlying skill — _____ .",
      "choices": [
        "teacher forcing",
        "probing classifiers",
        "learned absolute position embeddings",
        "benchmark contamination"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “benchmark contamination”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ : the judge favors whichever answer happens to be shown first (or second), independent of content.",
      "choices": [
        "Multi-query attention",
        "Fine-tuning",
        "Pre-LN",
        "Position bias"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Position bias”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ : a longer answer scores higher even when the extra length is padding rather than added correctness.",
      "choices": [
        "position-wise feed-forward network",
        "layer normalization",
        "Verbosity bias",
        "Perplexity"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Verbosity bias”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Evaluation that isn't theater\" teaches?",
      "choices": [
        "A public benchmark score is evidence about the benchmark , not about your task — contamination and format mismatch both inflate it independent of real capability.",
        "Multi-turn packing must track document boundaries and enforce them through the attention mask; for a multi-tenant deployment, a missing boundary between two tenants' packed conversations is a data-isolation failure, not just an ef",
        "Expert capacity limits, and the token-dropping they force under imbalance, are a real quality cost — MoE trades FLOPs for memory, serving complexity, and this dropping behavior, not a free capacity upgrade.",
        "Training is parallel across positions; generation is serial across tokens — the same objective that pretrains cheaply is expensive to sample from one token at a time."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Evaluation that isn't theater\" teaches?",
      "choices": [
        "One head is one weighted average — it can't simultaneously attend strongly to a definition, a carve-out, and a liability cap without compromising between them. Multiple heads give each relationship its own subspace and softmax.",
        "A held-out eval needs hundreds of graded examples , not dozens, before a few-point difference between releases means anything statistically.",
        "Bottleneck adapters, prefix tuning, and prompt tuning trade away some or all of LoRA's zero-overhead merge property for different parameter-count and quality trade-offs; IA³ keeps the foldability at an even smaller parameter count",
        "MQA and GQA cut the KV-cache by cutting kv_heads, not by shrinking the model — GQA with 4-8 groups is the standard middle ground between MQA's aggressive savings and full multi-head attention's quality."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Evaluation that isn't theater\" teaches?",
      "choices": [
        "Bottleneck adapters, prefix tuning, and prompt tuning trade away some or all of LoRA's zero-overhead merge property for different parameter-count and quality trade-offs; IA³ keeps the foldability at an even smaller parameter count",
        "LLM judges have specific, documented biases — position, verbosity, self-preference — mitigated by order-swapping, rubric scoring, and cross-family judges, never trusted as a raw single number.",
        "Homogenisation is the same fact viewed twice: shared backbones make adaptation cheap and lift every downstream task at once, and they propagate any shared blind spot into every downstream system at once.",
        "Format overfitting, sycophancy, and capability regression outside the tuning mix are the three specific failure modes to check for after any instruction-tuning run — not just task accuracy on the tuning distribution itself."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A model scores unusually well on a public multiple-choice benchmark, and you suspect its pretraining data included the benchmark itself. Which of the following is the strongest single piece of evidence for contamination?",
      "choices": [
        "The model also does well on your task-specific held-out eval set.",
        "Rewording the benchmark questions with identical meaning causes accuracy to drop sharply.",
        "The model's stated confidence is high across all answer choices.",
        "The benchmark has more questions than your held-out eval set."
      ],
      "correct": 1,
      "explain": "Genuine capability should survive a meaning-preserving paraphrase; a sharp accuracy drop under rewording means the model had memorized the surface form of the specific questions rather than the underlying skill. A is tempting but tells you nothing about contamination on the other benchmark — doing well on your own held-out set is good news about your task, not evidence either way about the public ",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit8#lesson-2": [
    {
      "stem": "Fill the blank: Stage two trains a _____ on human preference pairs: given two candidate answers to the same claimant question, a rater picks the better one, where \"better\" means accurate, appropriately hedged, and not paternalistic.",
      "choices": [
        "Byte-level BPE",
        "InfoNCE",
        "Self-preference bias",
        "reward model"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “reward model”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The fix is a _____ against a frozen reference policy (typically the SFT model): the training objective becomes E[r(x,y)] − β · KL(π_θ || π_ref) .",
      "choices": [
        "input/label shift",
        "Position bias",
        "KL penalty",
        "probing classifiers"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “KL penalty”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (reinforcement learning from AI feedback) has another model generate the preference labels instead, guided by a written constitution.",
      "choices": [
        "KL penalty",
        "Pre-LN",
        "word-level tokenizer",
        "RLAIF"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “RLAIF”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Alignment: RLHF, RLAIF, and the direct alternatives\" teaches?",
      "choices": [
        "In frozen feature extraction, the pretrained encoder never receives a gradient ; only the small head trains, which is what makes 400 labelled examples enough.",
        "The three-stage recipe — SFT, then a Bradley-Terry reward model on preference pairs, then RL policy optimization — traces to Christiano et al. 2017 and was standardized by InstructGPT in 2022.",
        "Intrinsic-dimension results (Li et al. 2018; Aghajanyan et al. 2020) show the update fine-tuning needs is low-rank , and the required rank shrinks further as the base model gets larger.",
        "Attention is direct lookup, not sequential compression. A token attends to every other token in one step, replacing the LSTM's relay race of 284 hidden-state updates between clause 3 and clause 287 with a single weighted read."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Alignment: RLHF, RLAIF, and the direct alternatives\" teaches?",
      "choices": [
        "DAPT continues the original pretraining objective on unlabelled in-domain text before any labelled fine-tuning; TAPT does the same but on the unlabelled version of the task's own (smaller) dataset — the two are complementary, not ",
        "The KL penalty against the frozen reference policy is what keeps PPO from reward hacking; removing it can produce confidently wrong, fluent, on-brand answers within a few hundred training steps.",
        "Auditability and drift detection are not optional on a legally consequential assistant — they are the deployment-time analog of the regression suite from Lesson 1.",
        "Merging BA into W removes all inference overhead but permanently binds one tenant's delta into the weights — exactly the outcome a shared 40-tenant deployment needs to avoid; production serving keeps adapters unmerged and batches "
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Alignment: RLHF, RLAIF, and the direct alternatives\" teaches?",
      "choices": [
        "Emergent abilities are real in some cases but Schaeffer et al. (2023) showed many \"sharp\" emergence curves are artifacts of a discontinuous metric (like exact-match) rather than a discontinuity in the model.",
        "Trained heads specialize measurably — positional, syntactic, and rare/defined-term tracking are documented patterns (Clark et al. 2019, Voita et al. 2019), and not every head is necessary (some are prunable).",
        "The 10% random branch forces contextual verification everywhere , and the 10% unchanged branch forces it precisely because the model can't tell which real tokens are \"trustworthy\" from the token alone.",
        "Reward hacking is a predictable consequence of optimizing hard against any proxy metric, not a rare accident — it shows up as answers that score well on the reward model while getting the eligibility facts wrong."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Alignment: RLHF, RLAIF, and the direct alternatives\" teaches?",
      "choices": [
        "Weight tying reuses the input embedding matrix as the output projection , halving the cost of the two largest tensors and adding a mild regularizing effect, at some loss of representational flexibility.",
        "Discriminative learning rates follow the layer-wise picture directly — lower layers move least, upper layers and the new head move most — and short schedules with warmup prevent the random head's early noisy gradients from destabi",
        "DPO replaces the reward model and RL loop with a single supervised loss over the same log-probability ratios used in pretraining, at the cost of being limited to the coverage of its offline preference data.",
        "Compute-optimal allocation solves N ≈ √(C/120) once you substitute the ~20-tokens-per-parameter ratio into C ≈ 6ND — a two-line calculation, not a grid search."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A reward model is trained on pairs of claimant-question answers where a human rater picked the better response. Under the Bradley-Terry framework, what does the reward model actually learn?",
      "choices": [
        "An absolute quality score on a fixed scale, such as 1 to 10, for any single answer in isolation.",
        "A scalar function such that the sigmoid of the difference between two answers' scores approximates the probability the first was preferred.",
        "A binary classification of each answer as \"correct\" or \"incorrect\" against ground truth.",
        "The exact dollar amount that should appear in a correct eligibility answer."
      ],
      "correct": 1,
      "explain": "Bradley-Terry models the preference probability as σ(r(x,y_w) − r(x,y_l)) — the reward model only ever has to rank two answers relative to each other, never assign an absolute score. A is wrong because nothing in the Bradley-Terry loss anchors the reward to a fixed scale — only relative differences are trained. C and D confuse a preference-ranking reward model with a fact-checker or an answer key,",
      "difficulty": "hard"
    }
  ],
  "course-2-foundational-models/unit8#lesson-3": [
    {
      "stem": "True or false: retaining the exact model version and prompt template used for a given claimant conversation is good engineering hygiene but not a strict requirement, since the conversation transcript alone is sufficient if a determination is later appealed.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. A transcript alone doesn't explain why a specific answer was produced once the model or prompt template has since been updated — reproducing or defending a months-old determination on appeal requires the exact version pinning, not just the exchanged text. Treating this as \"nice hygiene\" mistakes an audit requirement for a debugging convenience; in a legally consequential setting, th",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ has a small, fast draft model propose several tokens ahead; the large model then verifies all of them in a single forward pass and accepts the matching prefix, discarding the rest for a correction.",
      "choices": [
        "probing classifiers",
        "Position bias",
        "width",
        "Speculative decoding"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Speculative decoding”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (TTFT) and time-per-output-token (TPOT) are different metrics with different user-facing meanings.",
      "choices": [
        "Mixture of Experts",
        "Pre-tokenization",
        "TAPT",
        "Time-to-first-token"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Time-to-first-token”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Time-to-first-token (TTFT) and _____ (TPOT) are different metrics with different user-facing meanings.",
      "choices": [
        "Unigram",
        "time-per-output-token",
        "effective batch size is the difficulty knob",
        "Speculative decoding"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “time-per-output-token”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Deployment: latency, cost, and guardrails\" teaches?",
      "choices": [
        "Normalization (NFKC) fixes encoding inconsistency but casefolding actively destroys meaning in SKUs, model numbers, and Turkish's dotted/dotless i distinction — multilingual catalogue tokenizers generally skip lowercasing.",
        "Quantization degrades tail behavior first — precise thresholds, rare facts, multi-step reasoning — while average fluency survives; validate against a task eval set, not perplexity.",
        "Linear probes and k-NN probes judge representation quality using only a small proxy label set or none at all, letting you compare pretraining choices before committing to full downstream adaptation.",
        "A pretext task manufactures its own label from the input by a fixed corruption rule — no human annotation, applicable to every sequence in the corpus for free."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Deployment: latency, cost, and guardrails\" teaches?",
      "choices": [
        "The KV cache, not the weights, is usually the binding memory constraint at serving time for long conversations; paged attention manages it the way virtual memory manages RAM.",
        "InfoNCE is a softmax classification loss where the \"class\" for row i is index i itself — the similarity matrix's diagonal is the entire label structure.",
        "BPE and WordPiece both merge upward from characters but score candidate merges differently — raw co-occurrence frequency for BPE, a likelihood-improvement ratio for WordPiece.",
        "QLoRA's three techniques — NF4 quantization, double quantization, paged optimizers — shrink the frozen base's footprint and smooth training-time memory spikes; they compose with LoRA rather than replace it."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Most of this assistant's answers are short: one number, one regulation citation, one caveat, delivered in a couple of sentences. Which latency metric matters most for how responsive the assistant feels to these claimants?",
      "choices": [
        "Time-to-first-token",
        "Time-per-output-token",
        "Total GPU throughput",
        "Cost per million output tokens"
      ],
      "correct": 0,
      "explain": "For a short answer, the whole stream finishes almost as soon as it starts, so the wait before the first token dominates the felt experience. B (time-per-output-token) matters more for the minority of long, multi-paragraph explanations of interacting benefits, where the reader is watching text stream in over several seconds. C and D are real capacity and cost concerns for the operator, but neither ",
      "difficulty": "hard"
    },
    {
      "stem": "A junior engineer argues: \"Unit 7 showed mixed-precision (fp16/bf16) training reaches the same loss as fp32 with proper loss scaling, so int4 post-training quantization at serving time should be just as lossless.\" Combining Unit 5's scaling-law material with this unit's material on quantization, what is the strongest objection?",
      "choices": [
        "Quantization and mixed-precision training use different numbers of bits, so the comparison is meaningless on its face.",
        "Mixed-precision training keeps a full-precision master copy of weights and gradients throughout training, actively correcting rounding error at every step; post-training ",
        "Mixed-precision training is always more accurate than any form of quantization, in any context.",
        "int4 quantization only affects intermediate activations, not the learned weights, so it cannot touch stored facts at all."
      ],
      "correct": 1,
      "explain": "This is the real mechanism: mixed-precision training corrects for rounding continuously via a full-precision master copy, while post-training quantization rounds once and never corrects, striking hardest exactly where scaling laws say capacity is thinnest — the rare facts and precise thresholds a small share of parameters carry. A gestures at a real difference (bit count) but doesn't explain why i",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit1#lesson-1": [
    {
      "stem": "Lowercasing every post before feeding it to a moderation classifier is always the correct preprocessing choice, because case carries no useful signal.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. ALL-CAPS is a real signal of shouting, aggression, or heightened emotion, and case also disambiguates named entities from common words. Whether to lowercase depends on the downstream model and task — a sparse bag-of-words feature set benefits from folding, but an expressive subword/neural model can use case as a useful feature and loses information if it's folded away. This is a com",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ fixes this by rewriting text into one of a handful of canonical forms.",
      "choices": [
        "TF-IDF",
        "Unicode normalisation",
        "abstractive",
        "ROUGE"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Unicode normalisation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Normalization Form Canonical Composition) prefers the precomposed form wherever one exists, which is usually what you want for display and for a model vocabulary trained on typical text.",
      "choices": [
        "negative sampling",
        "NFC",
        "constrained decoding",
        "hybrid"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “NFC”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The preprocessing pipeline\" teaches?",
      "choices": [
        "Macro-averaging is the honest choice when rare classes (rare diseases, rare adverse events) must not be masked by common ones; micro and weighted averaging both let frequent classes dominate the number to varying degrees.",
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight — TF-IDF corrects this.",
        "On financial news: BERT owns headline sentiment, ticker/company extraction, market-moving-vs-routine classification, and stance detection; GPT owns generating analyst commentary.",
        "Preprocessing is always lossy — there is no \"clean\" version of a text that preserves all information; every step is a trade-off you should make deliberately for your task."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The preprocessing pipeline\" teaches?",
      "choices": [
        "NFKC normalisation is a security control for moderation systems , not just cosmetic cleanup — it closes homoglyph and compatibility-character evasions of keyword filters.",
        "Recall should usually be prioritized over precision for adverse-event detection, since a missed event is far costlier than a false alarm a reviewer dismisses quickly.",
        "Back-translation helps only as far as the reverse model is competent — with a weak reverse model (the norm for pairs like Rohingya), it bakes in a systematic, self-reinforcing bias rather than harmless noise.",
        "High accuracy on an imbalanced clinical dataset is easy to achieve and easy to be meaningless — always check class balance before trusting an accuracy number."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The preprocessing pipeline\" teaches?",
      "choices": [
        "TF-IDF is still bag-of-words: \"car\" and \"automobile\" are orthogonal dimensions with zero shared signal — closing that gap is the job of embeddings, not TF-IDF.",
        "Neither family gets the other's skill for free — fine-tuning a decoder to \"classify\" means training it to generate a label token, an indirect route BERT doesn't need.",
        "Case folding helps sparse bag-of-words models but can delete shouting/emphasis signal that a moderation classifier specifically needs.",
        "Cosine similarity, not Euclidean distance, is the standard comparison for word/document vectors because it measures direction (meaning) and ignores magnitude (frequency effects)."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A moderation pipeline needs to normalise a post that mixes precomposed accented characters, Cyrillic look-alike letters used to dodge a keyword filter, and a fullwidth Unicode variant of a Latin letter. Which normalisation form is the right choice, and why?",
      "choices": [
        "NFD, because it decomposes everything into base characters plus combining marks",
        "NFC, because it always prefers the shortest possible representation",
        "NFKC, because it collapses both canonical and compatibility variants, including many homoglyph and fullwidth substitutions",
        "Lowercasing, because case folding also normalises alternate character forms"
      ],
      "correct": 2,
      "explain": "NFKC (Compatibility Composition) collapses both canonically equivalent forms and compatibility variants — fullwidth letters, ligatures, and many stylistic substitutions — into one standard form, which is exactly the security-relevant behavior needed against homoglyph and compatibility-character evasion. NFD decomposes rather than composes, which doesn't help match variants to a single form for loo",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit1#lesson-2": [
    {
      "stem": "Byte-level tokenization can never produce an out-of-vocabulary token, because its vocabulary already covers every possible input by construction.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 0,
      "explain": "Answer: True. At the byte level the vocabulary is exactly the 256 possible byte values, so any input string, however novel or adversarial, decomposes into some sequence of already-known units — there is no such thing as an unrepresentable byte. (A character-level vocabulary is only closed in this way if it enumerates the whole codepoint space; production character models usually restrict it to cha",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A _____ is the smallest unit of text a model treats as one item — the atomic thing that gets mapped to a vector, attended over, and predicted.",
      "choices": [
        "chrF",
        "token",
        "ROUGE",
        "perplexity"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “token”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Push subword splitting to its logical extreme and you get _____ tokenization — every individual Unicode codepoint (or, one level lower, every raw byte) is its own token.",
      "choices": [
        "Top-k sampling",
        "perplexity",
        "character-level",
        "COMET"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “character-level”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Tokenization: word, subword, character\" teaches?",
      "choices": [
        "N-grams (bigrams, trigrams) recover local word order that unigram bag-of-words discards — critical for legal negation flips like \"not liable\" versus \"liable.\"",
        "A token is whatever unit a model treats as atomic — the boundary is a design choice, not a fact about language.",
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight — TF-IDF corrects this.",
        "Four distinct failure modes — retrieval misses, the model ignoring good context, contradictory chunks, and unfaithful citations — each need different fixes, and none of them is caught by a single end-to-end accuracy score."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Tokenization: word, subword, character\" teaches?",
      "choices": [
        "Full-vocabulary softmax is the bottleneck: a million-word vocabulary makes exact softmax training computationally infeasible at corpus scale.",
        "WEAT quantifies embedding-level bias by comparing target-word similarity to two attribute-word sets — a large, consistent gap signals absorbed association, useful as an audit tool before deployment.",
        "Whitespace tokenization fails on contractions, multi-word entities, glued punctuation, and glued emoji — all common in social posts.",
        "[CLS] pooling turns a variable-length sequence into one fixed vector for BERT's classification head; mean pooling is a viable alternative but not the trained default."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Tokenization: word, subword, character\" teaches?",
      "choices": [
        "BIOES/BILOU adds explicit end (E/L) and single-token (S/U) tags, typically buying 1–2 F1 points by giving the model a direct signal for span boundaries — at the cost of a larger tag set.",
        "Word-level vocabularies hit an OOV wall on invented spellings, elongation, and leetspeak obfuscation — exactly the adversarial patterns moderation systems must catch.",
        "The distributional hypothesis (Harris, formalized; Firth, popularized) — words in similar contexts have similar meanings — is the theoretical bet every embedding method from word2vec through BERT ultimately makes.",
        "Intrinsic evaluation (analogy, similarity benchmarks) and extrinsic evaluation (downstream task performance) can disagree — always check the downstream metric that actually matters for the deployed system."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Tokenization: word, subword, character\" teaches?",
      "choices": [
        "LSTMs persist on-device because of O(1) per-step state, not because they're more accurate than a transformer — streaming cost and memory footprint are the deciding factors here, not raw language-modelling quality.",
        "Subword tokenization (BPE/WordPiece) solves OOV by composing rare or unseen words from frequent sub-pieces , which is why it is the modern default for noisy user text.",
        "Clinical notes are dominated by O tokens (often 90%+), which makes token-level accuracy a misleading training and evaluation signal from the very first lesson of this unit.",
        "[SEP] plus segment embeddings let one BERT forward pass handle sentence-pair tasks like headline-versus-analyst-quote stance detection."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Tokenization: word, subword, character\" teaches?",
      "choices": [
        "For high-volume, fixed-schema classification (50k headlines/day, three labels), a small fine-tuned BERT usually wins on latency, cost, and determinism simultaneously.",
        "Stemming is fast and rule-based but can produce non-words and false conflations (e.g., \"bully\" collapsing toward \"bull\") — lemmatization is slower and dictionary-driven but stays linguistically correct.",
        "Character/byte tokenization has a closed, complete vocabulary and cannot produce true OOV , but pays for that robustness in much longer sequences and higher compute per post.",
        "Moving from unigrams to bigrams to trigrams causes a combinatorial explosion in vocabulary size, worsening the sparsity that was already extreme at the unigram level."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    }
  ],
  "course-3-text-processing/unit1#lesson-3": [
    {
      "stem": "Fill the blank: _____ chops affixes off words using fixed rules, with no awareness of what part of speech the word is or whether the result is a real word at all.",
      "choices": [
        "Multi-class",
        "hallucination",
        "Aspect term extraction",
        "Stemming"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Stemming”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: One classical technique survives this whole shift essentially unscathed: _____ , contiguous sequences of n tokens treated as a unit (\"not going\" as a bigram, rather than \"not\" and \"going\" scored separately).",
      "choices": [
        "Citation faithfulness",
        "TF-IDF",
        "Token classification",
        "n-grams"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “n-grams”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Stemming, lemmatization, stopwords, and the classical normalisation stack\" teaches?",
      "choices": [
        "High accuracy on an imbalanced clinical dataset is easy to achieve and easy to be meaningless — always check class balance before trusting an accuracy number.",
        "Add-k smoothing floors every count above zero; Kneser-Ney smoothing improves on this by weighting words by how many distinct contexts they appear in, not just raw frequency.",
        "Character/byte tokenization has a closed, complete vocabulary and cannot produce true OOV , but pays for that robustness in much longer sequences and higher compute per post.",
        "The Porter stemmer (1980) and the classical normalisation stack were built for 1970s–80s information retrieval , where cheap exact-match indexing mattered more than linguistic correctness."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Stemming, lemmatization, stopwords, and the classical normalisation stack\" teaches?",
      "choices": [
        "Stemming is fast and rule-based but can produce non-words and false conflations (e.g., \"bully\" collapsing toward \"bull\") — lemmatization is slower and dictionary-driven but stays linguistically correct.",
        "Case folding helps sparse bag-of-words models but can delete shouting/emphasis signal that a moderation classifier specifically needs.",
        "The document-term matrix at real corpus scale (50k docs × 100k terms) is over 99.9% zero; sparse storage (e.g., CSR) keeps memory proportional to actual content, not vocabulary size.",
        "ABSA is two subtasks: aspect term extraction (sequence tagging, like NER) and per-aspect sentiment classification, solvable as a pipeline (simpler, error-propagates) or a joint model (better accuracy, extended BIO tag set: B-POS/I"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Stemming, lemmatization, stopwords, and the classical normalisation stack\" teaches?",
      "choices": [
        "Stopword removal can delete the exact word that carries meaning — negation words like \"not\" are stopwords, and removing them can flip a sentence's meaning for a moderation model.",
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight — TF-IDF corrects this.",
        "Preprocessing is always lossy — there is no \"clean\" version of a text that preserves all information; every step is a trade-off you should make deliberately for your task.",
        "The fine-tuning recipe from Course 2 Unit 6 — small learning rate, few epochs, task head on the pretrained trunk — makes 2,000 labeled headlines workable where training from scratch would fail."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Stemming, lemmatization, stopwords, and the classical normalisation stack\" teaches?",
      "choices": [
        "N-gram features are one direct fix for the negation problem , since a bigram like \"not_hurt\" survives as one unit where individually-scored words don't.",
        "The fine-tuning recipe from Course 2 Unit 6 — small learning rate, few epochs, task head on the pretrained trunk — makes 2,000 labeled headlines workable where training from scratch would fail.",
        "NFKC normalisation is a security control for moderation systems , not just cosmetic cleanup — it closes homoglyph and compatibility-character evasions of keyword filters.",
        "Evaluate per-aspect, not overall — class imbalance across aspects and polarities means a high aggregate accuracy can hide total failure on the rare aspect that matters most (a safety complaint, a recall-triggering defect)."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Stemming, lemmatization, stopwords, and the classical normalisation stack\" teaches?",
      "choices": [
        "Preprocessing is always lossy — there is no \"clean\" version of a text that preserves all information; every step is a trade-off you should make deliberately for your task.",
        "Modern subword transformers skip nearly this entire classical stack — but it still lives on inside sparse retrieval indexes and classical bag-of-words/TF-IDF feature pipelines.",
        "Bias is not a training bug: embeddings faithfully encode whatever associations the training corpus contains, including historical hiring-related gender and demographic skew (Bolukbasi et al., 2016).",
        "N-grams (bigrams, trigrams) recover local word order that unigram bag-of-words discards — critical for legal negation flips like \"not liable\" versus \"liable.\""
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Why is the classical stemming/lemmatization/stopword-removal stack largely skipped when preparing input for a modern subword transformer, but still used in some retrieval and feature-engineering pipelines?",
      "choices": [
        "Transformers cannot process any text that hasn't been stemmed first, so the stack is irrelevant, not skipped",
        "Subword tokenization already groups morphological variants into overlapping pieces the model learns to treat similarly, while classical exact-match retrieval and bag-of-w",
        "Stemming and lemmatization were both proven mathematically incorrect and are never used anywhere today",
        "Transformers are trained specifically to reverse stemming, making the step redundant"
      ],
      "correct": 1,
      "explain": "A subword tokenizer implicitly captures morphological relationships by breaking related words into shared pieces, and attention lets the model weigh context without pre-decided stopword rules — so the classical stack's job is already partly done by the tokenizer and the model. Sparse retrieval indexes and classical feature pipelines (bag-of-words, TF-IDF) still rely on exact string matching, where",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit2#lesson-1": [
    {
      "stem": "Fill the blank: The _____ (BoW) represents a document as an unordered multiset of its tokens — a \"bag\" you could shake, losing all information about where each word sat relative to the others, but keeping exactly how many times each one appears.",
      "choices": [
        "COMET",
        "bag-of-words model",
        "Continuous Bag of Words (CBOW)",
        "Extractive"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “bag-of-words model”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Building the bag-of-words representation means constructing the _____ : a table with 50,000 rows (one per document) and 100,000 columns (one per vocabulary term), where cell (i, j) holds the count of term j in document i.",
      "choices": [
        "chrF",
        "Extractive",
        "smoothing",
        "document-term matrix"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “document-term matrix”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Real systems use _____ instead: formats like compressed sparse row (CSR) that store only the nonzero entries as (row, column, value) triples, plus compact index arrays to reconstruct rows and columns on demand.",
      "choices": [
        "Under-translation",
        "hierarchical",
        "Token classification",
        "sparse storage"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “sparse storage”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The Bag-of-Words model\" teaches?",
      "choices": [
        "On-device fine-tuning personalizes without exporting raw text; federated learning extends personalization across users by aggregating model updates, not messages, on a central server.",
        "Bag-of-words maps each document to a vector of term counts over a fixed vocabulary — the vector-space model — discarding all word order in the process.",
        "Contextual embeddings (BERT, Unit 5) compute a vector per occurrence , not per word-string, which is the structural fix for polysemy that static embeddings cannot provide.",
        "Count-based n-gram language models estimate P(word | preceding words) from raw corpus counts, which assigns exactly zero probability to any unseen n-gram — the zero-probability problem ."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A 50,000-document legal corpus with a 100,000-term vocabulary produces a document-term matrix with roughly what proportion of nonzero entries?",
      "choices": [
        "Roughly 50%, since half the documents share common legal boilerplate.",
        "Well under 0.1% — the matrix is extremely sparse, since any single document only uses a small fraction of the full vocabulary.",
        "Roughly 100%, since every document contains at least one instance of most common words like \"the\" and \"shall.\"",
        "It depends entirely on whether stemming was applied during preprocessing."
      ],
      "correct": 1,
      "explain": "A single legal document, even a long one, typically touches only a few hundred distinct terms out of a 100,000-term vocabulary, so well over 99.9% of the document-term matrix is zero. Option C is the tempting distractor because a handful of very common words (\"the,\" \"shall\") really do appear in nearly every document, but those few common columns don't make the matrix dense overall — the vast major",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit2#lesson-2": [
    {
      "stem": "Fill the blank: Raw counts rank these two terms exactly backwards from their actual usefulness, and that failure is what _____ (term frequency–inverse document frequency) exists to fix.",
      "choices": [
        "Retrieval misses",
        "smoothing",
        "Stemming",
        "TF-IDF"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “TF-IDF”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The \"+1\" in the denominator is _____ : without it, a term appearing in every single document (df(t) = N) would produce idf = log(1) = 0, which is fine, but a hypothetical term appearing in zero documents would divide by zero.",
      "choices": [
        "BIOES",
        "add-k smoothing",
        "smoothing",
        "hybrid"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “smoothing”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"TF-IDF: weighting words by informativeness\" teaches?",
      "choices": [
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight — TF-IDF corrects this.",
        "RAG's pipeline is chunk → embed → index → retrieve top-k → rerank → stuff into prompt → generate with citations — every stage reuses a mechanism taught earlier in this course, which is why this is the capstone lesson.",
        "A linear-chain CRF fixes this by scoring whole tag sequences with emission + transition scores, and Viterbi decoding finds the best legal sequence in polynomial time via dynamic programming.",
        "Flat tagging schemes assign exactly one label per token, so they structurally cannot represent nested or overlapping entities like \"stage II breast cancer\" without dropping one of the two true spans."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"TF-IDF: weighting words by informativeness\" teaches?",
      "choices": [
        "Bias is not a training bug: embeddings faithfully encode whatever associations the training corpus contains, including historical hiring-related gender and demographic skew (Bolukbasi et al., 2016).",
        "The document-term matrix at real corpus scale (50k docs × 100k terms) is over 99.9% zero; sparse storage (e.g., CSR) keeps memory proportional to actual content, not vocabulary size.",
        "Term frequency variants (raw, log-scaled, augmented) all measure local prominence; log-scaling and augmentation both damp the effect of a term repeating many times in one document.",
        "Moving from unigrams to bigrams to trigrams causes a combinatorial explosion in vocabulary size, worsening the sparsity that was already extreme at the unigram level."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"TF-IDF: weighting words by informativeness\" teaches?",
      "choices": [
        "Inverse document frequency , idf(t) = log(N / (1 + df(t))), rewards rarity across the corpus; the \"+1\" smooths against zero-division and the log compensates for Zipf's-law skew in natural-language term frequencies.",
        "Weight tying shares the embedding and projection matrices, roughly halving parameters in embedding-dominated small models, with a side benefit of a slight regularizing effect on perplexity.",
        "Independent per-token softmax (plain HMM emissions or a naive classification head) can emit illegal BIO sequences like an I-DRUG with no preceding B-DRUG — nothing in the model architecture forbids it.",
        "Extractive summarization trades fluency for traceability : every claim in the output is literally sourced verbatim, which is why high-stakes pipelines favor it, or a hybrid, over pure abstraction."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "In a corpus of 10,000 contracts, \"agreement\" appears in 9,800 of them and \"indemnification\" appears in 300 of them. Under TF-IDF, which statement is correct?",
      "choices": [
        "\"agreement\" will have a much higher idf value, since it appears more often overall.",
        "\"indemnification\" will have a much higher idf value, since it appears in far fewer documents.",
        "Both terms will have identical idf values, since idf only depends on term frequency within a document.",
        "idf cannot be computed unless every document contains both terms."
      ],
      "correct": 1,
      "explain": "idf(t) = log(N / (1 + df(t))) grows as document frequency df(t) shrinks — \"indemnification,\" with a much smaller df (300 vs. 9,800 out of 10,000), gets a much larger idf, correctly rewarding its rarity and discriminative power. Option C is wrong because it confuses idf (a corpus-wide statistic, one value per term) with term frequency (a per-document statistic) — idf has nothing to do with counts w",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit2#lesson-3": [
    {
      "stem": "Fill the blank: N-grams also underlie the classical approach to _____ : estimating the probability of a word given the preceding n−1 words, using nothing but corpus counts.",
      "choices": [
        "BIOES",
        "language modeling",
        "BIO",
        "Adaptive softmax"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “language modeling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The simplest, _____ (add-1, or \"Laplace smoothing,\" being the k=1 case), adds a small constant to every count before normalizing, so no bigram is ever assigned exactly zero probability, only a small nonzero floor.",
      "choices": [
        "Citation faithfulness",
        "add-k smoothing",
        "Named entity recognition",
        "Perplexity"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “add-k smoothing”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Language models are typically evaluated with _____ , a measure of how \"surprised\" the model is by held-out text — lower perplexity means the model assigned higher probability to what actually happened, i.e., it predicted the real text better.",
      "choices": [
        "cosine similarity",
        "perplexity",
        "Input guardrails",
        "Named entity recognition"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “perplexity”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"N-grams and the sparsity wall\" teaches?",
      "choices": [
        "N-gram features are one direct fix for the negation problem , since a bigram like \"not_hurt\" survives as one unit where individually-scored words don't.",
        "The king-man+woman=queen result shows embeddings encode relationships as linear offsets, not just proximities — but the result is a famous cherry-picked example, and most analogy queries on a real space produce weaker or wrong res",
        "A linear-chain CRF fixes this by scoring whole tag sequences with emission + transition scores, and Viterbi decoding finds the best legal sequence in polynomial time via dynamic programming.",
        "N-grams (bigrams, trigrams) recover local word order that unigram bag-of-words discards — critical for legal negation flips like \"not liable\" versus \"liable.\""
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"N-grams and the sparsity wall\" teaches?",
      "choices": [
        "Moving from unigrams to bigrams to trigrams causes a combinatorial explosion in vocabulary size, worsening the sparsity that was already extreme at the unigram level.",
        "Neural LMs generalize where n-grams memorize: a continuous hidden state lets similar-but-not-identical contexts produce similar predictions, which is exactly what personal, idiosyncratic keyboard text needs.",
        "[CLS] pooling is the trained default for classification heads; mean pooling is worth testing on small datasets but is not a free substitute.",
        "ABSA is two subtasks: aspect term extraction (sequence tagging, like NER) and per-aspect sentiment classification, solvable as a pipeline (simpler, error-propagates) or a joint model (better accuracy, extended BIO tag set: B-POS/I"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"N-grams and the sparsity wall\" teaches?",
      "choices": [
        "Full-vocabulary softmax is the bottleneck: a million-word vocabulary makes exact softmax training computationally infeasible at corpus scale.",
        "Teacher forcing trains in parallel by feeding ground-truth previous tokens rather than the model's own predictions, trading a train/inference mismatch for much faster, more stable optimization.",
        "Intrinsic evaluation (analogy, similarity benchmarks) and extrinsic evaluation (downstream task performance) can disagree — always check the downstream metric that actually matters for the deployed system.",
        "Count-based n-gram language models estimate P(word | preceding words) from raw corpus counts, which assigns exactly zero probability to any unseen n-gram — the zero-probability problem ."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"N-grams and the sparsity wall\" teaches?",
      "choices": [
        "Bias is not a training bug: embeddings faithfully encode whatever associations the training corpus contains, including historical hiring-related gender and demographic skew (Bolukbasi et al., 2016).",
        "The phone budget is single-digit milliseconds and a few megabytes, forcing quantization (typically int8, ~4x smaller) as close to mandatory, with a modest, usually acceptable perplexity cost.",
        "Add-k smoothing floors every count above zero; Kneser-Ney smoothing improves on this by weighting words by how many distinct contexts they appear in, not just raw frequency.",
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight — TF-IDF corrects this."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "This bigram language model probability function has a bug: it returns exactly 0.0 for any bigram unseen in training, which will zero out an entire sequence's probability. What is the minimal fix, consistent with Lesson 3's add-k smoothing?",
      "choices": [
        "Add a try/except around the division to catch ZeroDivisionError.",
        "Add 1 to the numerator and add the vocabulary size V to the denominator: (bigram_counts[(w1,w2)] + 1) / (unigram_counts[w1] + V) .",
        "Replace the function with a lookup into a precomputed table of only the bigrams that occurred in training.",
        "Sort the bigram counts and return the median count instead of the exact count."
      ],
      "correct": 1,
      "explain": "This is add-1 (Laplace) smoothing: adding 1 to every bigram count and V (vocabulary size) to every unigram count guarantees every possible bigram gets a small nonzero probability, fixing the zero-probability problem without changing the relative ordering of well-attested bigrams much. Option A is the tempting distractor because the raw function as written won't actually raise ZeroDivisionError for",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit3#lesson-1": [
    {
      "stem": "Given a large enough corpus and better-tuned weights, a TF-IDF vector representation can be made to recognize that \"car\" and \"automobile\" are semantically related.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. TF-IDF assigns one fixed dimension per vocabulary word; \"car\" and \"automobile\" occupy separate, mutually orthogonal axes by construction. No amount of reweighting changes the fact that the dot product between two distinct word-dimensions is zero — the representation has no mechanism for cross-word relationships at all. This is a structural limitation of the representation's dimensio",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Firth was building on Zellig Harris, who a few years earlier had proposed the _____ more formally: words that occur in similar contexts tend to have similar meanings.",
      "choices": [
        "span-based",
        "distributional hypothesis",
        "greedy decoding",
        "BILOU"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “distributional hypothesis”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That geometry is what makes _____ the natural tool for comparing two words or two documents built from word vectors.",
      "choices": [
        "Extrinsic evaluation",
        "Named entity recognition",
        "BLEU",
        "cosine similarity"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “cosine similarity”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The distributional hypothesis and dense vectors\" teaches?",
      "choices": [
        "Negation scope, sarcasm, comparatives, and implicit aspects are the four recurring failure modes — each defeats a naive local-window or bag-of-words approach in a different way.",
        "TF-IDF's fatal gap: one dimension per word makes every pair of distinct words orthogonal by construction — it cannot represent that \"car\" and \"automobile\" are related, regardless of how the weights are tuned.",
        "ABSA is two subtasks: aspect term extraction (sequence tagging, like NER) and per-aspect sentiment classification, solvable as a pipeline (simpler, error-propagates) or a joint model (better accuracy, extended BIO tag set: B-POS/I",
        "Raw beam scores favor short sequences because every token multiplies in a probability less than one; length normalization ( score / length^alpha ) restores a fair comparison across hypothesis lengths."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The distributional hypothesis and dense vectors\" teaches?",
      "choices": [
        "Task-oriented systems decompose into intent classification, slot filling (BIO tagging, same mechanism as NER/ABSA), and dialogue state tracking — losing state across turns is the most common source of user-visible frustration.",
        "Because the dot product in cosine similarity only accumulates over shared nonzero terms, it is cheap to compute even on very high-dimensional sparse vectors.",
        "Dense vectors buy geometry: compressing a large vocabulary into ~100–300 real-valued dimensions forces shared structure to emerge, so related words end up as nearby points instead of independent axes.",
        "Span-based tagging (score candidate start/end pairs directly) trades higher compute for the ability to keep overlapping spans, and is the standard escape hatch for nested biomedical entities."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The distributional hypothesis and dense vectors\" teaches?",
      "choices": [
        "High accuracy on an imbalanced clinical dataset is easy to achieve and easy to be meaningless — always check class balance before trusting an accuracy number.",
        "Evaluate per-aspect, not overall — class imbalance across aspects and polarities means a high aggregate accuracy can hide total failure on the rare aspect that matters most (a safety complaint, a recall-triggering defect).",
        "Back-translation helps only as far as the reverse model is competent — with a weak reverse model (the norm for pairs like Rohingya), it bakes in a systematic, self-reinforcing bias rather than harmless noise.",
        "Cosine similarity, not Euclidean distance, is the standard comparison for word/document vectors because it measures direction (meaning) and ignores magnitude (frequency effects)."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which pairing correctly attributes the two foundational ideas behind the distributional hypothesis?",
      "choices": [
        "Firth formalized \"distributional structure\" as a linguistic theory; Harris popularized \"you shall know a word by the company it keeps.\"",
        "Harris formalized distributional structure; Firth is credited with the \"company it keeps\" line.",
        "Mikolov coined both ideas in the 2013 word2vec paper.",
        "Pennington and Socher first proposed the distributional hypothesis in the GloVe paper."
      ],
      "correct": 1,
      "explain": "Zellig Harris formalized the distributional hypothesis in the 1950s; J.R. Firth's 1957 line is the memorable popularization of the same idea. Mikolov's word2vec (2013) operationalized the hypothesis into a trainable algorithm decades later — it didn't originate the idea. Option A swaps the two names' contributions. Option D is wrong because GloVe (2014) is a training method built on the same pre-e",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit3#lesson-2": [
    {
      "stem": "Fill the blank: _____ takes the words surrounding a target position — say, the four words on either side of a gap in a job posting — and tries to predict the missing center word from their averaged context.",
      "choices": [
        "Continuous Bag of Words (CBOW)",
        "Stemming",
        "ROUGE",
        "Retrieval recall@k"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Continuous Bag of Words (CBOW)”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ runs the opposite direction: given a single center word, it tries to predict each of the surrounding context words independently.",
      "choices": [
        "Beam search",
        "keyword retrieval",
        "Skip-gram",
        "Slot filling"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Skip-gram”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Mikolov's fix, _____ , reframes the entire problem.",
      "choices": [
        "hierarchical",
        "negative sampling",
        "n-grams",
        "sampling strategy"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “negative sampling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ then factorizes that matrix: it learns word vectors such that the dot product of two word vectors approximates the log of their co-occurrence count, weighted so that very rare co-occurrences (likely noise) contribute less to the loss than common ones.",
      "choices": [
        "GloVe",
        "span-based",
        "keyword retrieval",
        "Stemming"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “GloVe”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Word2vec and GloVe: how the vectors are learned\" teaches?",
      "choices": [
        "Contextual embeddings (BERT, Unit 5) compute a vector per occurrence , not per word-string, which is the structural fix for polysemy that static embeddings cannot provide.",
        "WEAT quantifies embedding-level bias by comparing target-word similarity to two attribute-word sets — a large, consistent gap signals absorbed association, useful as an audit tool before deployment.",
        "Skip-gram predicts context from center word; CBOW predicts center word from averaged context — skip-gram generally wins on rare words because it generates one training example per context word instead of averaging them away.",
        "ABSA is two subtasks: aspect term extraction (sequence tagging, like NER) and per-aspect sentiment classification, solvable as a pipeline (simpler, error-propagates) or a joint model (better accuracy, extended BIO tag set: B-POS/I"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A resume-matching pipeline needs embeddings that group words by broad topical relatedness (e.g., \"python\" near \"pandas,\" \"data,\" and \"backend\") rather than strict grammatical substitutability. Which training choice best supports that goal?",
      "choices": [
        "Use CBOW instead of skip-gram.",
        "Use a small context window (2–3 words).",
        "Use a larger context window (8–10 words).",
        "Increase the negative sampling exponent above 1.0."
      ],
      "correct": 2,
      "explain": "A larger window captures topical co-occurrence across a whole sentence or paragraph, pulling together words that share a subject matter even if they never sit adjacent. Small windows instead favor syntactic substitutability — words that occupy the same grammatical slot. A is a red herring: CBOW vs. skip-gram affects rare-word quality and training speed, not the syntactic/topical trade-off, which i",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit3#lesson-3": [
    {
      "stem": "Once a debiasing technique (such as projecting out a learned \"gender direction\") is applied to an embedding space, downstream applications like resume ranking can be considered free of the bias that was measured before debiasing.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Gonen and Goldberg (2019) showed that debiased vectors still cluster stereotypically male- and female-associated words together in their overall neighborhood structure, even after the single identified linear direction is projected out — the bias is distributed across correlated directions, not confined to the one axis that got removed. Debiasing measurably reduces the specific asso",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A standard way to measure this quantitatively is the _____ , from Caliskan, Bryson, and Narayanan (2017), adapted from the psychology literature's Implicit Association Test.",
      "choices": [
        "recursive summarization",
        "constrained decoding",
        "length normalization",
        "Word Embedding Association Test (WEAT)"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Word Embedding Association Test (WEAT)”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ tests the vectors directly — analogy accuracy (the king-queen-style tests from Lesson 1), or correlation between cosine similarity and human-labeled word-similarity judgments on benchmark datasets like WordSim-353.",
      "choices": [
        "sparse storage",
        "Intrinsic evaluation",
        "Citation faithfulness",
        "cross-attention"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Intrinsic evaluation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ instead plugs the vectors into a real downstream task — does using these embeddings improve resume-to-job matching accuracy, measured against actual hiring outcomes — and measures the task metric.",
      "choices": [
        "perplexity",
        "Retrieval recall@k",
        "token",
        "Extrinsic evaluation"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Extrinsic evaluation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Limits: polysemy, bias, and OOV\" teaches?",
      "choices": [
        "One vector per word-string means word2vec/GloVe cannot separate senses — \"python\" the language and the snake share a single, blended vector, causing false-positive similarity in ambiguous cases.",
        "Stemming is fast and rule-based but can produce non-words and false conflations (e.g., \"bully\" collapsing toward \"bull\") — lemmatization is slower and dictionary-driven but stays linguistically correct.",
        "A token is whatever unit a model treats as atomic — the boundary is a design choice, not a fact about language.",
        "Gradient clipping and truncated BPTT keep training stable and affordable on effectively unbounded streaming text; variational dropout regularizes without corrupting the recurrent memory the way per-timestep dropout does."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Limits: polysemy, bias, and OOV\" teaches?",
      "choices": [
        "Cosine similarity, not Euclidean distance, is the standard comparison for word/document vectors because it measures direction (meaning) and ignores magnitude (frequency effects).",
        "Contextual embeddings (BERT, Unit 5) compute a vector per occurrence , not per word-string, which is the structural fix for polysemy that static embeddings cannot provide.",
        "Entity-level F1 for NER requires an exact span-and-type match — a partially correct dosage span counts as a full miss, matching the real clinical cost of a truncated fact.",
        "BIOES/BILOU adds explicit end (E/L) and single-token (S/U) tags, typically buying 1–2 F1 points by giving the model a direct signal for span boundaries — at the cost of a larger tag set."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Limits: polysemy, bias, and OOV\" teaches?",
      "choices": [
        "Bias is not a training bug: embeddings faithfully encode whatever associations the training corpus contains, including historical hiring-related gender and demographic skew (Bolukbasi et al., 2016).",
        "Full-vocabulary softmax is the bottleneck: a million-word vocabulary makes exact softmax training computationally infeasible at corpus scale.",
        "Sampling strategy is a UX decision: greedy for the single inline ghost-text suggestion, top-k/temperature for a ranked row of chips, nucleus sampling reserved for less literal, more generative contexts.",
        "BLEU is especially unreliable for morphologically rich, low-resource languages (Swahili, Rohingya) because word boundaries and morpheme choices vary in ways that break exact n-gram matching without changing meaning."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Limits: polysemy, bias, and OOV\" teaches?",
      "choices": [
        "Cosine similarity compares document vectors by angle, not magnitude, so it is insensitive to document length — the right default metric for sparse count vectors.",
        "[CLS] pooling is the trained default for classification heads; mean pooling is worth testing on small datasets but is not a free substitute.",
        "WEAT quantifies embedding-level bias by comparing target-word similarity to two attribute-word sets — a large, consistent gap signals absorbed association, useful as an audit tool before deployment.",
        "Bidirectional attention (MLM, Course 2 Unit 4) gives BERT full context on a fixed span, which is exactly what classification, extraction, and stance detection need."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    }
  ],
  "course-3-text-processing/unit4#lesson-1": [
    {
      "stem": "Fill the blank: What's new in this lesson is wiring that cell into a full _____ : a system that reads a prefix of tokens and outputs a probability distribution over the entire vocabulary for what comes next.",
      "choices": [
        "bag-of-words model",
        "multi-label",
        "neural language model",
        "Intrinsic evaluation"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “neural language model”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: First, an _____ maps each input token — a word or subword piece, using the tokenizer from Course 3 Unit 1 — to a dense vector, typically 128 to 512 dimensions for a keyboard-scale model.",
      "choices": [
        "Retrieval recall@k",
        "embedding layer",
        "in-context learning (ICL)",
        "length normalization"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “embedding layer”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: This is where _____ becomes a product decision, not just a math detail.",
      "choices": [
        "BILOU",
        "smoothing",
        "sampling strategy",
        "hierarchical"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “sampling strategy”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ always picks the single highest-probability token; it's fast and deterministic but tends toward bland, repetitive completions and can get stuck in loops (\"the the the\").",
      "choices": [
        "Retrieval misses",
        "reranker",
        "abstractive",
        "Greedy decoding"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Greedy decoding”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Neural language modelling\" teaches?",
      "choices": [
        "Neural LMs generalize where n-grams memorize: a continuous hidden state lets similar-but-not-identical contexts produce similar predictions, which is exactly what personal, idiosyncratic keyboard text needs.",
        "The causal mask (CLM, Course 2 Unit 4) is not a limitation to work around in GPT — it is the property that makes autoregressive generation possible at all.",
        "TF-IDF's fatal gap: one dimension per word makes every pair of distinct words orthogonal by construction — it cannot represent that \"car\" and \"automobile\" are related, regardless of how the weights are tuned.",
        "Inverse document frequency , idf(t) = log(N / (1 + df(t))), rewards rarity across the corpus; the \"+1\" smooths against zero-division and the log compensates for Zipf's-law skew in natural-language term frequencies."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A user has typed \"Running late, be there in about\" and the keyboard's word-level LSTM-LM has never seen this exact five-word sequence during training, yet it still suggests \"10\", \"20\", and \"five\" with reasonable confidence. What best explains this?",
      "choices": [
        "The model memorized every possible five-word prefix during training and looked this one up.",
        "The embedding and recurrent layers generalize from similar contexts seen during training, so a novel exact sequence still maps to a sensible region of hidden-state space.",
        "The model falls back to a uniform random guess whenever it encounters an unseen context.",
        "The vocabulary was restricted at training time to only contain numbers after \"about\"."
      ],
      "correct": 1,
      "explain": "This is the core generalization advantage over n-grams from Lesson 1: the continuous hidden state produced by the embedding + LSTM stack represents context, not an exact lookup key, so semantically similar contexts (any \"be there in about ___\" phrasing) produce similar predictions even without exact repetition. A is the n-gram-style failure mode this unit explicitly moves away from — an RNN-LM has",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit4#lesson-2": [
    {
      "stem": "Fill the blank: _____ is the standard evaluation metric for a language model: it is the exponentiated average negative log-likelihood the model assigns to held-out text, PPL = exp(-1/N Σ log p(w_i | context)) .",
      "choices": [
        "multi-label",
        "multilingual model",
        "hybrid",
        "Perplexity"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Perplexity”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Grave et al., 2017) splits the vocabulary into frequency-based clusters — a small \"head\" cluster of the few hundred most frequent words, and progressively larger \"tail\" clusters of rarer words.",
      "choices": [
        "ROUGE",
        "Intrinsic evaluation",
        "Adaptive softmax",
        "Retrieval recall@k"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Adaptive softmax”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Making it work: perplexity, tied weights, and the softmax bottleneck\" teaches?",
      "choices": [
        "Perplexity is the target metric — exponentiated average negative log-likelihood; keyboard LMs aim for roughly 20–60, lower for personalized models with narrower vocabulary.",
        "Guardrails apply on both input and output , reusing Course 2 Unit 8's filtering architecture — an assistant that only screens user input is still exposed to its own hallucinated promises.",
        "The document-term matrix at real corpus scale (50k docs × 100k terms) is over 99.9% zero; sparse storage (e.g., CSR) keeps memory proportional to actual content, not vocabulary size.",
        "Three-stage architecture: embedding lookup → LSTM recurrence (built on the Course 1 Unit 7 cell) → linear projection to vocabulary-sized logits, softmax for a distribution."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Making it work: perplexity, tied weights, and the softmax bottleneck\" teaches?",
      "choices": [
        "BIOES/BILOU adds explicit end (E/L) and single-token (S/U) tags, typically buying 1–2 F1 points by giving the model a direct signal for span boundaries — at the cost of a larger tag set.",
        "Weight tying shares the embedding and projection matrices, roughly halving parameters in embedding-dominated small models, with a side benefit of a slight regularizing effect on perplexity.",
        "Pure generation hallucinates company facts structurally , because model parameters are a frozen, lossy snapshot of training data that likely never contained this company's current policy — grounding (Lesson 3) fixes this, unground",
        "The Porter stemmer (1980) and the classical normalisation stack were built for 1970s–80s information retrieval , where cheap exact-match indexing mattered more than linguistic correctness."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Making it work: perplexity, tied weights, and the softmax bottleneck\" teaches?",
      "choices": [
        "Moving from unigrams to bigrams to trigrams causes a combinatorial explosion in vocabulary size, worsening the sparsity that was already extreme at the unigram level.",
        "L2 normalization puts documents of different lengths on a common scale and turns a dot product into a cosine similarity.",
        "Adaptive/hierarchical softmax exploit Zipfian word frequency to make the vocabulary-sized final layer cheap on average, since a small head cluster resolves most real predictions.",
        "Contextual embeddings (BERT, Unit 5) compute a vector per occurrence , not per word-string, which is the structural fix for polysemy that static embeddings cannot provide."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Making it work: perplexity, tied weights, and the softmax bottleneck\" teaches?",
      "choices": [
        "Recall should usually be prioritized over precision for adverse-event detection, since a missed event is far costlier than a false alarm a reviewer dismisses quickly.",
        "For high-volume, fixed-schema classification (50k headlines/day, three labels), a small fine-tuned BERT usually wins on latency, cost, and determinism simultaneously.",
        "Gradient clipping and truncated BPTT keep training stable and affordable on effectively unbounded streaming text; variational dropout regularizes without corrupting the recurrent memory the way per-timestep dropout does.",
        "ELIZA (1966) through modern LLM assistants spans two lineages — task-oriented (intent + slots + fixed backend actions) and open-domain retrieval-based — that traded flexibility for reliability in opposite directions; LLMs generate"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A technique that reuses the embedding matrix as the transpose of the final projection layer, roughly halving the parameter count in embedding-dominated small models, is called .",
      "choices": [
        "gradient clipping",
        "weight tying",
        "truncated BPTT",
        "adaptive softmax"
      ],
      "correct": 1,
      "explain": "Lesson 2 covers this directly: since the embedding table and projection layer share shape when embed_dim equals hidden_dim, tying them into one shared matrix removes a duplicate large matrix from the model, which matters most in small on-device models. Gradient clipping addresses exploding gradients during training, not parameter count. Truncated BPTT bounds the backward pass over long/streaming s",
      "difficulty": "hard"
    },
    {
      "stem": "Why does adaptive softmax reduce the average cost of the final vocabulary projection on a keyboard LM, given a 30,000-token vocabulary?",
      "choices": [
        "It reduces the total vocabulary the model can ever predict from 30,000 down to a few hundred words.",
        "It exploits the Zipfian frequency distribution of language: a small, cheaply-computed head cluster of frequent words resolves the vast majority of real predictions, so th",
        "It replaces softmax with a lookup table, eliminating normalization entirely.",
        "It only works if the embedding and projection matrices are tied."
      ],
      "correct": 1,
      "explain": "As Lesson 2 explains, adaptive softmax buckets the vocabulary by frequency; because real text is Zipfian, the small head cluster of the most frequent words is checked at full cost on essentially every prediction, while the larger, cheaper-per-token tail clusters are only reached for the (much rarer) uncommon-word predictions — so the expected cost per prediction drops sharply. A is wrong — the ful",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit4#lesson-3": [
    {
      "stem": "Fill the blank: _____ — a few extra gradient steps on the user's own recent typing, run locally, updating only a small adapter or the last layer rather than the whole network — closes much of this gap without ever sending the user's text off the device.",
      "choices": [
        "On-device fine-tuning",
        "causal language modeling (CLM)",
        "greedy decoding",
        "Extractive"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “On-device fine-tuning”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Deploying an on-device LSTM\" teaches?",
      "choices": [
        "COMET and BERTScore use learned embeddings to catch semantic equivalence missed by surface metrics, but remain blind to whether a specific fact or number is actually supported by the source.",
        "The distributional hypothesis (Harris, formalized; Firth, popularized) — words in similar contexts have similar meanings — is the theoretical bet every embedding method from word2vec through BERT ultimately makes.",
        "A note can belong to multiple specialties at once, making note-routing a multi-label problem (independent per-label sigmoids), not a multi-class one forcing a single label.",
        "The phone budget is single-digit milliseconds and a few megabytes, forcing quantization (typically int8, ~4x smaller) as close to mandatory, with a modest, usually acceptable perplexity cost."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Deploying an on-device LSTM\" teaches?",
      "choices": [
        "On financial news: BERT owns headline sentiment, ticker/company extraction, market-moving-vs-routine classification, and stance detection; GPT owns generating analyst commentary.",
        "Plain fine-tuned BERT token classification now matches or beats BiLSTM-CRF on most benchmarks because its contextual representations implicitly learn the BIO grammar; BERT-CRF still adds a small, real gain on boundary-sensitive en",
        "On-device fine-tuning personalizes without exporting raw text; federated learning extends personalization across users by aggregating model updates, not messages, on a central server.",
        "Macro-averaging is the honest choice when rare classes (rare diseases, rare adverse events) must not be masked by common ones; micro and weighted averaging both let frequent classes dominate the number to varying degrees."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Deploying an on-device LSTM\" teaches?",
      "choices": [
        "Perplexity measures how well a language model predicts held-out text; n-gram models plateaued because fixed-window context plus exploding sparsity is a ceiling smoothing cannot lift — the reason neural language models (Unit 4) rep",
        "Three-stage architecture: embedding lookup → LSTM recurrence (built on the Course 1 Unit 7 cell) → linear projection to vocabulary-sized logits, softmax for a distribution.",
        "Adaptive/hierarchical softmax exploit Zipfian word frequency to make the vocabulary-sized final layer cheap on average, since a small head cluster resolves most real predictions.",
        "Cold start on unseen words is unavoidable for any fixed-vocabulary model; a character-level or n-gram fallback and a small personal word cache cover the gap subword tokenization doesn't fully close."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Deploying an on-device LSTM\" teaches?",
      "choices": [
        "Modern subword transformers skip nearly this entire classical stack — but it still lives on inside sparse retrieval indexes and classical bag-of-words/TF-IDF feature pipelines.",
        "Cross-attention is the fact-transfer channel. Every decoding step queries the full encoder output; a fact that never gets attention weight never reaches the translation, with no visible symptom in the fluent output.",
        "BiLSTM-CRF (2015–2018) paired neural feature extraction with a CRF's transition constraints and was the dominant clinical NER architecture before BERT.",
        "LSTMs persist on-device because of O(1) per-step state, not because they're more accurate than a transformer — streaming cost and memory footprint are the deciding factors here, not raw language-modelling quality."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Federated learning, as used for keyboard personalization, works by uploading each user's raw typed text to a central server, which trains one improved shared model on the combined dataset.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "The entire point of federated learning, as Lesson 3 describes, is that raw text never leaves the device — each device computes a local model update from its own private data, and only that update (not the underlying text) is sent to the server for aggregation into an improved shared model. The scenario in the question describes ordinary centralized training on collected raw text, which is exactly ",
      "difficulty": "hard"
    },
    {
      "stem": "A teammate wrote this streaming keyboard-LM session handler, but users report that suggestions get slower and slower the longer they keep typing in a single text field (a long message eventually takes seconds per keystroke instead of milliseconds). Find the bug and explain the fix.",
      "choices": [
        "The bug is in tokenizer.retokenize — it should return a fixed-size array instead of a growing list.",
        "The bug is that the hidden state h, c is reset and the entire typed history is replayed through the LSTM on every single keystroke, turning O(1) per-step work into O(mess",
        "The bug is that top_suggestions is called with k=3 instead of k=1, which is slower.",
        "The bug is that self.model should be re-initialized on every keystroke to avoid stale predictions."
      ],
      "correct": 1,
      "explain": "Lesson 3's whole point about O(1) per-step state is violated here: init_state() plus a full replay loop means keystroke N does N steps of LSTM work, so a long message degrades quadratically overall (and linearly per keystroke) — exactly the slowdown users are reporting. The fix persists self.h, self.c as session state (as in the lesson's KeyboardLMSession ) and calls self.model.step once per new k",
      "difficulty": "hard"
    },
    {
      "stem": "A keyboard LM's word-level model returns None for a token because it's out-of-vocabulary (e.g., the user is typing a friend's name for the first time). Complete the missing line so the session falls back to the character-level model instead of returning no suggestions at all.",
      "choices": [
        "return []",
        "return session.char_fallback.predict(session.typed_token_ids)",
        "raise ValueError(\"unknown token\")",
        "return top_suggestions(logits, k=3) (reusing the previous logits)"
      ],
      "correct": 1,
      "explain": "This is exactly the cold-start handling from Lesson 3: an out-of-vocabulary token should route to the smaller character-level (or n-gram) fallback model, which operates over a fixed alphabet and so has no \"unknown token\" problem, keeping the suggestion bar populated instead of going blank. A silently gives up and degrades the product experience for every novel word. C would crash the keyboard mid-",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit5#lesson-1": [
    {
      "stem": "If you removed the causal mask from a pretrained GPT model's self-attention layers, it would generate text just as well as before, only with richer context.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. The causal mask isn't an optional restriction — it reflects the real constraint at generation time that future tokens don't exist yet. A model trained without it learns to attend to positions it won't have access to during actual autoregressive generation, and its next-token predictions become meaningless once you try to generate one token at a time for real. It's tempting to think ",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: GPT is pretrained with the complementary objective, _____ , also covered in Course 2 Unit 4: given every token up to position i , predict token i +1.",
      "choices": [
        "distributional hypothesis",
        "causal language modeling (CLM)",
        "hierarchical",
        "reranker"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “causal language modeling (CLM)”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Two families from one architecture\" teaches?",
      "choices": [
        "Three-stage architecture: embedding lookup → LSTM recurrence (built on the Course 1 Unit 7 cell) → linear projection to vocabulary-sized logits, softmax for a distribution.",
        "Bias is not a training bug: embeddings faithfully encode whatever associations the training corpus contains, including historical hiring-related gender and demographic skew (Bolukbasi et al., 2016).",
        "Bidirectional attention (MLM, Course 2 Unit 4) gives BERT full context on a fixed span, which is exactly what classification, extraction, and stance detection need.",
        "GloVe factorizes a precomputed global co-occurrence matrix rather than predicting local context online, but lands in similar-quality vector space — both approaches operationalize the same distributional hypothesis differently."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Two families from one architecture\" teaches?",
      "choices": [
        "Debiasing (e.g., projecting out a gender direction) is partial: correlated, indirect bias survives even after the identified axis is removed (Gonen & Goldberg, 2019) — downstream ranking audits are still necessary.",
        "The causal mask (CLM, Course 2 Unit 4) is not a limitation to work around in GPT — it is the property that makes autoregressive generation possible at all.",
        "Preprocessing is always lossy — there is no \"clean\" version of a text that preserves all information; every step is a trade-off you should make deliberately for your task.",
        "Dense vectors buy geometry: compressing a large vocabulary into ~100–300 real-valued dimensions forces shared structure to emerge, so related words end up as nearby points instead of independent axes."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Two families from one architecture\" teaches?",
      "choices": [
        "Weight tying shares the embedding and projection matrices, roughly halving parameters in embedding-dominated small models, with a side benefit of a slight regularizing effect on perplexity.",
        "[CLS] pooling turns a variable-length sequence into one fixed vector for BERT's classification head; mean pooling is a viable alternative but not the trained default.",
        "Macro-averaging is the honest choice when rare classes (rare diseases, rare adverse events) must not be masked by common ones; micro and weighted averaging both let frequent classes dominate the number to varying degrees.",
        "BoW cannot distinguish \"dog bites man\" from \"man bites dog,\" or reliably track negation — a real limitation that motivates n-grams (Lesson 3)."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Two families from one architecture\" teaches?",
      "choices": [
        "Neural LMs generalize where n-grams memorize: a continuous hidden state lets similar-but-not-identical contexts produce similar predictions, which is exactly what personal, idiosyncratic keyboard text needs.",
        "BIO/IOB2 encodes both boundary (B vs I vs O) and type in one tag per token, with the hard constraint that I-TYPE must follow B-TYPE or I-TYPE of the same type.",
        "On financial news: BERT owns headline sentiment, ticker/company extraction, market-moving-vs-routine classification, and stance detection; GPT owns generating analyst commentary.",
        "The unigram^0.75 exponent is an empirically-tuned smoothing factor that boosts rare-word sampling rate and damps ultra-frequent filler words, without going fully uniform."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Two families from one architecture\" teaches?",
      "choices": [
        "Back-translation helps only as far as the reverse model is competent — with a weak reverse model (the norm for pairs like Rohingya), it bakes in a systematic, self-reinforcing bias rather than harmless noise.",
        "Neither family gets the other's skill for free — fine-tuning a decoder to \"classify\" means training it to generate a label token, an indirect route BERT doesn't need.",
        "Cosine similarity, not Euclidean distance, is the standard comparison for word/document vectors because it measures direction (meaning) and ignores magnitude (frequency effects).",
        "For high-volume, fixed-schema classification (50k headlines/day, three labels), a small fine-tuned BERT usually wins on latency, cost, and determinism simultaneously."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    }
  ],
  "course-3-text-processing/unit5#lesson-2": [
    {
      "stem": "FinBERT-style domain-adaptive pretraining on financial text eliminates the need for any labeled data when fine-tuning for a downstream task like headline sentiment.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Domain-adaptive pretraining continues the unsupervised MLM objective on unlabeled finance text, which adapts the model's vocabulary and word senses — it says nothing about a specific downstream decision boundary. You still need labeled examples to fine-tune the task head, exactly as in Lesson 2; domain-adaptive pretraining makes that fine-tuning more label-efficient, not label-free.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (which spans are tickers, which are company names) instead attaches a linear layer to every token position's final hidden state, each one independently predicting a tag from a small label set.",
      "choices": [
        "Token classification",
        "Retrieval recall@k",
        "in-context learning (ICL)",
        "cosine similarity"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Token classification”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Applying BERT: fine-tuning for understanding tasks\" teaches?",
      "choices": [
        "Three-stage architecture: embedding lookup → LSTM recurrence (built on the Course 1 Unit 7 cell) → linear projection to vocabulary-sized logits, softmax for a distribution.",
        "TF-IDF is still bag-of-words: \"car\" and \"automobile\" are orthogonal dimensions with zero shared signal — closing that gap is the job of embeddings, not TF-IDF.",
        "The fine-tuning recipe from Course 2 Unit 6 — small learning rate, few epochs, task head on the pretrained trunk — makes 2,000 labeled headlines workable where training from scratch would fail.",
        "Document-level sentiment loses information a business needs whenever a review is mixed, which is common — aspect-level granularity is what turns raw text into an actionable signal."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Applying BERT: fine-tuning for understanding tasks\" teaches?",
      "choices": [
        "Token classification requires aligning per-word labels to sub-word tokens; label only the first WordPiece of each word and mask continuations with -100 , or your loss and metrics are both wrong.",
        "Pure generation hallucinates company facts structurally , because model parameters are a frozen, lossy snapshot of training data that likely never contained this company's current policy — grounding (Lesson 3) fixes this, unground",
        "Greedy decoding commits early and can't undo commitments — beam search keeps multiple hypotheses alive so later context can resolve ambiguity greedy decoding would have locked in wrong.",
        "Back-translation helps only as far as the reverse model is competent — with a weak reverse model (the norm for pairs like Rohingya), it bakes in a systematic, self-reinforcing bias rather than harmless noise."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Applying BERT: fine-tuning for understanding tasks\" teaches?",
      "choices": [
        "Because the dot product in cosine similarity only accumulates over shared nonzero terms, it is cheap to compute even on very high-dimensional sparse vectors.",
        "[SEP] plus segment embeddings let one BERT forward pass handle sentence-pair tasks like headline-versus-analyst-quote stance detection.",
        "COMET and BERTScore use learned embeddings to catch semantic equivalence missed by surface metrics, but remain blind to whether a specific fact or number is actually supported by the source.",
        "NFKC normalisation is a security control for moderation systems , not just cosmetic cleanup — it closes homoglyph and compatibility-character evasions of keyword filters."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Applying BERT: fine-tuning for understanding tasks\" teaches?",
      "choices": [
        "Domain-adaptive pretraining (the FinBERT pattern) fixes vocabulary and word-sense mismatch by continuing MLM on unlabeled finance text — cheaper than collecting more labels.",
        "The king-man+woman=queen result shows embeddings encode relationships as linear offsets, not just proximities — but the result is a famous cherry-picked example, and most analogy queries on a real space produce weaker or wrong res",
        "BLEU = n-gram precision × brevity penalty ; it requires exact string matches, so a valid synonym substitution can tank the score even when meaning is fully preserved.",
        "Perplexity measures how well a language model predicts held-out text; n-gram models plateaued because fixed-window context plus exploding sparsity is a ceiling smoothing cannot lift — the reason neural language models (Unit 4) rep"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Applying BERT: fine-tuning for understanding tasks\" teaches?",
      "choices": [
        "BiLSTM-CRF (2015–2018) paired neural feature extraction with a CRF's transition constraints and was the dominant clinical NER architecture before BERT.",
        "[CLS] pooling is the trained default for classification heads; mean pooling is worth testing on small datasets but is not a free substitute.",
        "The causal mask (CLM, Course 2 Unit 4) is not a limitation to work around in GPT — it is the property that makes autoregressive generation possible at all.",
        "TF-IDF is still bag-of-words: \"car\" and \"automobile\" are orthogonal dimensions with zero shared signal — closing that gap is the job of embeddings, not TF-IDF."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Complete the sub-word label alignment loop so that continuation word-pieces (like \"##TR\" in a split ticker) are correctly excluded from the loss.",
      "choices": [
        "label_to_id[labels[word_id]]",
        "-100",
        "0",
        "label_to_id[\"O\"]"
      ],
      "correct": 1,
      "explain": "Continuation word-pieces must be masked with the ignore index so they contribute nothing to the loss and are skipped in entity-level evaluation — only the first piece of each word carries a real label. Option A repeats the label onto every fragment, the classic bug from Lesson 2: it inflates the loss and corrupts span-level metrics. Options C and D both assign a real, counted label (\"O\" or class 0",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit5#lesson-3": [
    {
      "stem": "Fill the blank: Both are instances of _____ : the model's behavior changes based on what's in the prompt, but no gradient update happens anywhere and no weights change.",
      "choices": [
        "teacher forcing",
        "Input guardrails",
        "Retrieval misses",
        "in-context learning (ICL)"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “in-context learning (ICL)”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Applying GPT: prompting, in-context learning, and when to fine-tune\" teaches?",
      "choices": [
        "Sampling strategy is a UX decision: greedy for the single inline ghost-text suggestion, top-k/temperature for a ranked row of chips, nucleus sampling reserved for less literal, more generative contexts.",
        "[CLS] pooling turns a variable-length sequence into one fixed vector for BERT's classification head; mean pooling is a viable alternative but not the trained default.",
        "The causal mask (CLM, Course 2 Unit 4) is not a limitation to work around in GPT — it is the property that makes autoregressive generation possible at all.",
        "In-context learning changes model behavior entirely within a forward pass — no weights are updated, and why it works as well as it does remains a genuinely open research question."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Applying GPT: prompting, in-context learning, and when to fine-tune\" teaches?",
      "choices": [
        "Modern subword transformers skip nearly this entire classical stack — but it still lives on inside sparse retrieval indexes and classical bag-of-words/TF-IDF feature pipelines.",
        "TF-IDF's fatal gap: one dimension per word makes every pair of distinct words orthogonal by construction — it cannot represent that \"car\" and \"automobile\" are related, regardless of how the weights are tuned.",
        "Prompt format (example order, label wording, whitespace) can swing accuracy by ten points or more; treat prompts like code that needs testing, not instructions you write once.",
        "BIO/IOB2 encodes both boundary (B vs I vs O) and type in one tag per token, with the hard constraint that I-TYPE must follow B-TYPE or I-TYPE of the same type."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Applying GPT: prompting, in-context learning, and when to fine-tune\" teaches?",
      "choices": [
        "Guardrails apply on both input and output , reusing Course 2 Unit 8's filtering architecture — an assistant that only screens user input is still exposed to its own hallucinated promises.",
        "Negation scope, sarcasm, comparatives, and implicit aspects are the four recurring failure modes — each defeats a naive local-window or bag-of-words approach in a different way.",
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight — TF-IDF corrects this.",
        "For high-volume, fixed-schema classification (50k headlines/day, three labels), a small fine-tuned BERT usually wins on latency, cost, and determinism simultaneously."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Applying GPT: prompting, in-context learning, and when to fine-tune\" teaches?",
      "choices": [
        "Greedy decoding commits early and can't undo commitments — beam search keeps multiple hypotheses alive so later context can resolve ambiguity greedy decoding would have locked in wrong.",
        "Three-stage architecture: embedding lookup → LSTM recurrence (built on the Course 1 Unit 7 cell) → linear projection to vocabulary-sized logits, softmax for a distribution.",
        "High accuracy on an imbalanced clinical dataset is easy to achieve and easy to be meaningless — always check class balance before trusting an accuracy number.",
        "Generation tasks — analyst-style summary paragraphs — are exclusively GPT's territory, because BERT's architecture cannot produce novel fluent text at all."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Your pipeline ingests 200,000 earnings-call transcript snippets per day and must tag each one \"material guidance change\" or \"routine\" with a strict 50ms latency budget per snippet. Which approach fits best?",
      "choices": [
        "Zero-shot prompt each snippet to a large GPT-class model.",
        "Fine-tune a BERT encoder with a sequence-classification head on labeled examples.",
        "Fine-tune a GPT decoder to generate a one-word label token for each snippet.",
        "Prompt a GPT-class model to generate a one-paragraph summary, then classify the summary."
      ],
      "correct": 1,
      "explain": "Fixed two-label schema, high volume, and a tight latency budget is exactly the profile where a fine-tuned BERT classification head wins on latency, cost, and determinism. Option A is too slow and costly at this volume, and risks inconsistent labeling. Option C works around a limitation BERT doesn't have — routing classification through token generation adds complexity for no benefit here. Option D",
      "difficulty": "hard"
    },
    {
      "stem": "A team few-shot prompts a GPT model for headline sentiment and finds accuracy drops 15 points when they simply reorder the same three examples in the prompt, with no other change. What does this best illustrate?",
      "choices": [
        "The model is fundamentally incapable of sentiment classification.",
        "Reordering pushed the prompt over the model's context-window limit.",
        "In-context learning is sensitive to prompt format, not just prompt content.",
        "The model requires fine-tuning before it can do any classification task."
      ],
      "correct": 2,
      "explain": "Prompt sensitivity — where order, wording, and formatting move accuracy independent of the underlying task difficulty — is a well-documented property of in-context learning, and it's exactly why prompts need testing like code. A is contradicted by the fact that some ordering scored well. B is implausible for three short examples, far under typical context limits. D overreaches: the same model scor",
      "difficulty": "hard"
    },
    {
      "stem": "An analyst wants one nuanced, well-written 150-word summary paragraph of today's biggest earnings surprise for a morning newsletter — produced once, not at scale. Which approach is required?",
      "choices": [
        "A fine-tuned BERT sequence-classification head.",
        "A fine-tuned BERT token-classification tagger.",
        "A prompted GPT-class decoder model.",
        "Either BERT or GPT, since both can generate text equally well."
      ],
      "correct": 2,
      "explain": "Producing novel, fluent prose is a generation task, and generation is structurally GPT's job — its causal decoder produces text one token at a time. It's also low-volume and one-off, so the API latency and cost that ruled GPT out in Question 1 aren't a concern here. Options A and B are both understanding-task heads that output a label or a set of tags, never free text — neither has a mechanism to ",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit6#lesson-1": [
    {
      "stem": "Fill the blank: _____ (NER) is the task of finding spans of text that refer to a category of real-world thing — a drug, a dose, a disease, a symptom — and labelling each span with its type.",
      "choices": [
        "Weighted-averaging",
        "BLEU",
        "Top-p (nucleus) sampling",
        "Named entity recognition"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Named entity recognition”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The dominant scheme for turning \"these words form a span of type DRUG\" into per-token labels is _____ (also called IOB2).",
      "choices": [
        "sparse storage",
        "Extrinsic evaluation",
        "BIO",
        "n-grams"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “BIO”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (or equivalently BILOU : Begin, Inside, Last/End, Outside, Unit) splits this apart with two extra tags: E-TYPE (or L- ) explicitly marks the last token of a multi-token entity, and S-TYPE (or U- ) marks a single-token entity in its own right.",
      "choices": [
        "keyword retrieval",
        "teacher forcing",
        "BIOES",
        "BILOU"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “BIOES”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: BIOES (or equivalently _____ : Begin, Inside, Last/End, Outside, Unit) splits this apart with two extra tags: E-TYPE (or L- ) explicitly marks the last token of a multi-token entity, and S-TYPE (or U- ) marks a single-token entity in its own right.",
      "choices": [
        "aspect sentiment classification",
        "ROUGE",
        "BILOU",
        "Token classification"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “BILOU”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Sequence labelling and tagging schemes\" teaches?",
      "choices": [
        "Add-k smoothing floors every count above zero; Kneser-Ney smoothing improves on this by weighting words by how many distinct contexts they appear in, not just raw frequency.",
        "N-gram features are one direct fix for the negation problem , since a bigram like \"not_hurt\" survives as one unit where individually-scored words don't.",
        "Negation scope, sarcasm, comparatives, and implicit aspects are the four recurring failure modes — each defeats a naive local-window or bag-of-words approach in a different way.",
        "BIO/IOB2 encodes both boundary (B vs I vs O) and type in one tag per token, with the hard constraint that I-TYPE must follow B-TYPE or I-TYPE of the same type."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Sequence labelling and tagging schemes\" teaches?",
      "choices": [
        "A token is whatever unit a model treats as atomic — the boundary is a design choice, not a fact about language.",
        "BIOES/BILOU adds explicit end (E/L) and single-token (S/U) tags, typically buying 1–2 F1 points by giving the model a direct signal for span boundaries — at the cost of a larger tag set.",
        "Task-oriented systems decompose into intent classification, slot filling (BIO tagging, same mechanism as NER/ABSA), and dialogue state tracking — losing state across turns is the most common source of user-visible frustration.",
        "BoW cannot distinguish \"dog bites man\" from \"man bites dog,\" or reliably track negation — a real limitation that motivates n-grams (Lesson 3)."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A clinical note contains the phrase \"stage II breast cancer,\" and your annotation guidelines want both \"breast cancer\" tagged as DISEASE and \"stage II breast cancer\" tagged as a separate STAGED_CONDITION span. Which statement about representing this with flat BIO tagging is correct?",
      "choices": [
        "Flat BIO handles this fine as long as you use BIOES instead of plain BIO.",
        "Flat BIO cannot represent both spans simultaneously, because each token gets exactly one tag; you'd need to drop one span, merge them into a composite tag, or move to spa",
        "Flat BIO handles this by tagging \"II\" as O and the rest as normal DISEASE tokens.",
        "This is only a problem for BILOU, not for BIO/IOB2."
      ],
      "correct": 1,
      "explain": "BIO's data structure is a single label per token, so two overlapping spans covering the same tokens with different types cannot both be represented without losing information about one of them. Option A is wrong because BIOES also assigns exactly one tag per token — adding E/S tags sharpens boundaries within a single flat sequence but does nothing to enable overlapping spans. This is a structural ",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit6#lesson-2": [
    {
      "stem": "Fill the blank: The earliest statistical approach to clinical NER used _____ (HMMs): treat the tag sequence as a Markov chain, where each tag depends on the previous tag, and each observed token depends only on its own tag.",
      "choices": [
        "Viterbi decoding",
        "teacher forcing",
        "Hidden Markov Models",
        "Continuous Bag of Words (CBOW)"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Hidden Markov Models”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ (CRF), dominant from roughly 2005 through the mid-2010s, fixed the independence problem directly.",
      "choices": [
        "Viterbi decoding",
        "Named entity recognition",
        "linear-chain Conditional Random Field",
        "Top-p (nucleus) sampling"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “linear-chain Conditional Random Field”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Finding the highest-scoring legal tag sequence out of the exponentially many possible sequences is done with _____ , a dynamic-programming algorithm that reuses partial best-paths instead of enumerating every sequence.",
      "choices": [
        "Viterbi decoding",
        "hybrid",
        "Slot filling",
        "Hidden Markov Models"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Viterbi decoding”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: It adds no training cost and only a few lines of post-processing, which is why many production clinical-NLP pipelines use _____ over a plain BERT tagger instead of paying for a full CRF layer.",
      "choices": [
        "chunk",
        "Named entity recognition",
        "sampling strategy",
        "constrained decoding"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “constrained decoding”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Models for NER: from CRF to BERT\" teaches?",
      "choices": [
        "Perplexity is the target metric — exponentiated average negative log-likelihood; keyboard LMs aim for roughly 20–60, lower for personalized models with narrower vocabulary.",
        "TF-IDF is still bag-of-words: \"car\" and \"automobile\" are orthogonal dimensions with zero shared signal — closing that gap is the job of embeddings, not TF-IDF.",
        "Window size trades syntactic for topical similarity — small windows cluster grammatically interchangeable words, large windows cluster words that share a topic.",
        "Independent per-token softmax (plain HMM emissions or a naive classification head) can emit illegal BIO sequences like an I-DRUG with no preceding B-DRUG — nothing in the model architecture forbids it."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Models for NER: from CRF to BERT\" teaches?",
      "choices": [
        "WEAT quantifies embedding-level bias by comparing target-word similarity to two attribute-word sets — a large, consistent gap signals absorbed association, useful as an audit tool before deployment.",
        "A linear-chain CRF fixes this by scoring whole tag sequences with emission + transition scores, and Viterbi decoding finds the best legal sequence in polynomial time via dynamic programming.",
        "ELIZA (1966) through modern LLM assistants spans two lineages — task-oriented (intent + slots + fixed backend actions) and open-domain retrieval-based — that traded flexibility for reliability in opposite directions; LLMs generate",
        "Entity-level F1 for NER requires an exact span-and-type match — a partially correct dosage span counts as a full miss, matching the real clinical cost of a truncated fact."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Models for NER: from CRF to BERT\" teaches?",
      "choices": [
        "Greedy decoding commits early and can't undo commitments — beam search keeps multiple hypotheses alive so later context can resolve ambiguity greedy decoding would have locked in wrong.",
        "Stopword removal can delete the exact word that carries meaning — negation words like \"not\" are stopwords, and removing them can flip a sentence's meaning for a moderation model.",
        "Guardrails apply on both input and output , reusing Course 2 Unit 8's filtering architecture — an assistant that only screens user input is still exposed to its own hallucinated promises.",
        "BiLSTM-CRF (2015–2018) paired neural feature extraction with a CRF's transition constraints and was the dominant clinical NER architecture before BERT."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Given the emission and transition score arrays below (same convention as Lesson 2's Viterbi walkthrough: transitions[i][j] is the score of moving from tag i to tag j ), fill in the missing line inside the Viterbi recurrence so that dp[t, k] correctly holds the best cumulative score of any legal path ending in tag k at position t .",
      "choices": [
        "emissions[t, k] + transitions[:, k]",
        "dp[t-1] + transitions[:, k] + emissions[t, k]",
        "dp[t-1] * transitions[:, k]",
        "emissions[t, k] alone, since transitions only matter at decode time for tie-breaking"
      ],
      "correct": 1,
      "explain": "Each candidate score is the best cumulative score of a legal path ending in every possible previous tag ( dp[t-1] , a vector over all previous tags) plus the transition score into tag k from each of those previous tags ( transitions[:, k] ), plus the flat emission score for tag k at position t ( emissions[t, k] , a scalar broadcast over the vector). Taking the argmax over that combined vector pick",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit6#lesson-3": [
    {
      "stem": "A model that classifies clinical notes for the presence of a rare adverse drug event reports 97% accuracy on a test set where only 3% of notes contain a true adverse event. This accuracy figure, by itself, is strong evidence the model is clinically useful.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. A model that always predicts \"no adverse event\" would also score 97% accuracy on this data while catching zero real cases — accuracy on an imbalanced dataset is dominated by the majority class and says nothing about recall on the rare, clinically important class. The fix is to report recall (and precision) on the adverse-event class specifically, or at minimum a confusion matrix, ra",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ classification assumes each note gets exactly one label from a set — useful for something like \"which single specialty authored this note\" when that's genuinely mutually exclusive.",
      "choices": [
        "coverage",
        "Multi-class",
        "negative sampling",
        "in-context learning (ICL)"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Multi-class”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That's a _____ problem — each note gets a subset of labels, scored with independent sigmoid outputs per label rather than one softmax over all labels, and evaluated per-label rather than assuming labels compete with each other.",
      "choices": [
        "sparse storage",
        "multi-label",
        "hierarchical",
        "Beam search"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “multi-label”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is macro's per-class scores weighted by each class's support (how many true examples it has) — a middle ground that reflects real-world class frequency without letting one dominant class fully define the number.",
      "choices": [
        "Input guardrails",
        "add-k smoothing",
        "hybrid",
        "Weighted-averaging"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Weighted-averaging”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Text classification and evaluation done right\" teaches?",
      "choices": [
        "[SEP] plus segment embeddings let one BERT forward pass handle sentence-pair tasks like headline-versus-analyst-quote stance detection.",
        "Bag-of-words maps each document to a vector of term counts over a fixed vocabulary — the vector-space model — discarding all word order in the process.",
        "Evaluate per-aspect, not overall — class imbalance across aspects and polarities means a high aggregate accuracy can hide total failure on the rare aspect that matters most (a safety complaint, a recall-triggering defect).",
        "High accuracy on an imbalanced clinical dataset is easy to achieve and easy to be meaningless — always check class balance before trusting an accuracy number."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Text classification and evaluation done right\" teaches?",
      "choices": [
        "BLEU is especially unreliable for morphologically rich, low-resource languages (Swahili, Rohingya) because word boundaries and morpheme choices vary in ways that break exact n-gram matching without changing meaning.",
        "Cosine similarity, not Euclidean distance, is the standard comparison for word/document vectors because it measures direction (meaning) and ignores magnitude (frequency effects).",
        "A note can belong to multiple specialties at once, making note-routing a multi-label problem (independent per-label sigmoids), not a multi-class one forcing a single label.",
        "Generation tasks — analyst-style summary paragraphs — are exclusively GPT's territory, because BERT's architecture cannot produce novel fluent text at all."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Text classification and evaluation done right\" teaches?",
      "choices": [
        "Character/byte tokenization has a closed, complete vocabulary and cannot produce true OOV , but pays for that robustness in much longer sequences and higher compute per post.",
        "Sampling strategy is a UX decision: greedy for the single inline ghost-text suggestion, top-k/temperature for a ranked row of chips, nucleus sampling reserved for less literal, more generative contexts.",
        "Recall should usually be prioritized over precision for adverse-event detection, since a missed event is far costlier than a false alarm a reviewer dismisses quickly.",
        "Bidirectional attention (MLM, Course 2 Unit 4) gives BERT full context on a fixed span, which is exactly what classification, extraction, and stance detection need."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Your team is choosing an averaging method for reporting F1 across seven note-routing specialty classes. Rheumatology makes up only 2% of notes, but a missed rheumatology-relevant note has serious clinical consequences and your team wants the reported metric to reflect the model's weakness on that class rather than let it hide behind stron",
      "choices": [
        "Micro-averaged F1, because it reflects overall system throughput.",
        "Weighted-averaged F1, because it accounts for how rare rheumatology notes actually are.",
        "Macro-averaged F1, because it weights every class equally regardless of frequency, so rheumatology's score isn't diluted by common classes.",
        "Accuracy, since it's the simplest metric to communicate to stakeholders."
      ],
      "correct": 2,
      "explain": "Macro-averaging computes each class's F1 independently and takes an unweighted mean, so rheumatology's F1 counts exactly as much as internal medicine's, surfacing a weak rare class instead of letting it get outvoted. Weighted averaging (B) would weight rheumatology's contribution by its 2% support, meaning a rheumatology failure barely moves the number — the opposite of what the team wants. Micro-",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit7#lesson-1": [
    {
      "stem": "Because the decoder is trained with teacher forcing, it always conditions on the correct gold prefix during training but must condition on its own, possibly incorrect, prior outputs at inference — and this mismatch means a single early translation error can cause a cascading series of further errors. True or false?",
      "choices": [
        "True",
        "False"
      ],
      "correct": 0,
      "explain": "Answer: True. This is exactly exposure bias: training never lets the model practice recovering from a wrong prefix, because the prefix during training is always gold. At inference, once the decoder emits a wrong token, every subsequent generation step conditions on that wrong token as if it were fact, and the decoder — having no training signal for \"this history looks off\" — tends to keep generati",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The models behind both translation and summarization share one architecture: the _____ framework.",
      "choices": [
        "smoothing",
        "encoder-decoder",
        "BILOU",
        "NFC"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “encoder-decoder”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The mechanism that binds decoder output to encoder input is _____ , introduced in Course 2 Unit 2 as part of the transformer block.",
      "choices": [
        "hierarchical",
        "perplexity",
        "Over-translation",
        "cross-attention"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “cross-attention”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Generation is _____ : the decoder produces one token, appends it to its own output, and feeds that extended sequence back in to produce the next token, repeating until it emits an end-of-sequence marker.",
      "choices": [
        "autoregressive",
        "Token classification",
        "abstractive",
        "coverage"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “autoregressive”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The encoder-decoder framework and decoding\" teaches?",
      "choices": [
        "The king-man+woman=queen result shows embeddings encode relationships as linear offsets, not just proximities — but the result is a famous cherry-picked example, and most analogy queries on a real space produce weaker or wrong res",
        "Cross-attention is the fact-transfer channel. Every decoding step queries the full encoder output; a fact that never gets attention weight never reaches the translation, with no visible symptom in the fluent output.",
        "Weight tying shares the embedding and projection matrices, roughly halving parameters in embedding-dominated small models, with a side benefit of a slight regularizing effect on perplexity.",
        "GloVe factorizes a precomputed global co-occurrence matrix rather than predicting local context online, but lands in similar-quality vector space — both approaches operationalize the same distributional hypothesis differently."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The encoder-decoder framework and decoding\" teaches?",
      "choices": [
        "Case folding helps sparse bag-of-words models but can delete shouting/emphasis signal that a moderation classifier specifically needs.",
        "Sampling strategy is a UX decision: greedy for the single inline ghost-text suggestion, top-k/temperature for a ranked row of chips, nucleus sampling reserved for less literal, more generative contexts.",
        "Full-vocabulary softmax is the bottleneck: a million-word vocabulary makes exact softmax training computationally infeasible at corpus scale.",
        "Greedy decoding commits early and can't undo commitments — beam search keeps multiple hypotheses alive so later context can resolve ambiguity greedy decoding would have locked in wrong."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A beam search translator for Haitian Creole keeps truncating output before the location clause, even though the full-length continuation is clearly more accurate. Which change most directly addresses this?",
      "choices": [
        "Increase the beam width from 4 to 8.",
        "Apply length normalization to the cumulative log-probability score.",
        "Switch from teacher forcing to autoregressive training.",
        "Add a coverage penalty vector to the attention mechanism."
      ],
      "correct": 1,
      "explain": "Raw cumulative log-probability is a sum of negative terms, so every additional generated token makes the score more negative — beam search will systematically prefer shorter hypotheses unless the score is divided by length^alpha to make the comparison length-fair. Widening the beam (A) explores more hypotheses but doesn't change the scoring bias that favors short ones, so a wider beam can still pi",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit7#lesson-2": [
    {
      "stem": "Fill the blank: The oldest and still most widely reported such metric for translation is _____ (Bilingual Evaluation Understudy, Papineni et al.",
      "choices": [
        "BLEU",
        "character-level",
        "Retrieval recall@k",
        "add-k smoothing"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “BLEU”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (character F-score, Popović 2015) sidesteps the word-boundary problem by computing precision and recall over character n-grams instead of word n-grams, then taking their F-score.",
      "choices": [
        "BIO",
        "Named entity recognition",
        "token",
        "chrF"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “chrF”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: These learned metrics catch paraphrases and morphological variants that word-overlap metrics miss, and _____ in particular has become the strongest single automatic predictor of human preference in recent WMT metrics evaluations.",
      "choices": [
        "constrained decoding",
        "COMET",
        "exposure bias",
        "bag-of-words model"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “COMET”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A summary can be stuffed with unsupported additions and _____ will not dock it a single point for those additions, so long as the reference's own words are all present somewhere in the pile.",
      "choices": [
        "ROUGE",
        "add-k smoothing",
        "Token classification",
        "Input guardrails"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “ROUGE”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Evaluation and the faithfulness problem\" teaches?",
      "choices": [
        "BLEU = n-gram precision × brevity penalty ; it requires exact string matches, so a valid synonym substitution can tank the score even when meaning is fully preserved.",
        "LSTMs persist on-device because of O(1) per-step state, not because they're more accurate than a transformer — streaming cost and memory footprint are the deciding factors here, not raw language-modelling quality.",
        "A token is whatever unit a model treats as atomic — the boundary is a design choice, not a fact about language.",
        "RAG beats pure parametric generation on stale facts (re-index a changed doc instead of re-training a model) and beats pure keyword search on paraphrase (dense embeddings catch semantic matches BM25 misses) — hybrid retrieval (BM25"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Evaluation and the faithfulness problem\" teaches?",
      "choices": [
        "Task-oriented systems decompose into intent classification, slot filling (BIO tagging, same mechanism as NER/ABSA), and dialogue state tracking — losing state across turns is the most common source of user-visible frustration.",
        "BoW cannot distinguish \"dog bites man\" from \"man bites dog,\" or reliably track negation — a real limitation that motivates n-grams (Lesson 3).",
        "BLEU is especially unreliable for morphologically rich, low-resource languages (Swahili, Rohingya) because word boundaries and morpheme choices vary in ways that break exact n-gram matching without changing meaning.",
        "A note can belong to multiple specialties at once, making note-routing a multi-label problem (independent per-label sigmoids), not a multi-class one forcing a single label."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A team needs to automatically score Swahili translations of incident reports and has only one human reference translation per source sentence. Which metric is the most defensible choice, and why?",
      "choices": [
        "BLEU, because it's the most widely reported metric in the literature.",
        "chrF, because character n-gram overlap degrades gracefully under the morphological variation that breaks word-level exact matching.",
        "ROUGE, because it's recall-oriented and Swahili sentences are often long.",
        "Raw exact-match accuracy, because it's simplest to implement."
      ],
      "correct": 1,
      "explain": "Swahili's agreement prefixes mean a correct translation can take multiple valid morphological forms that share almost no exact word n-grams with any single fixed reference. chrF's character-level n-grams are far more tolerant of this variation — a slightly different prefix still shares most characters with the reference form — so chrF stays informative where BLEU would swing wildly based on which ",
      "difficulty": "hard"
    },
    {
      "stem": "An abstractive summarizer produces: \"Approximately 40 people were displaced after the flooding in the region.\" It reads fluently, is on-topic, and scores well on ROUGE-1 against the reference summary. The catch: no source report specified a number of displaced people at all. Which statement best explains why ROUGE failed to catch this?",
      "choices": [
        "ROUGE-1 only checks 4-grams, so a one-word insertion like \"40\" is invisible to it by design.",
        "ROUGE measures whether reference words appear in the hypothesis (recall); it has no mechanism for penalizing extra, unsupported content the hypothesis adds beyond the ref",
        "ROUGE was designed for translation, not summarization, so it isn't applicable to this case at all.",
        "The summarizer must have used a larger beam width, which is what caused the hallucination."
      ],
      "correct": 1,
      "explain": "ROUGE's recall orientation means it checks how much of the reference's content shows up in the hypothesis — it never checks the reverse direction, whether everything in the hypothesis is actually supported by the reference or the source. An invented number sitting alongside otherwise-accurate, reference-matching content doesn't reduce the recall score at all, because recall only counts what's miss",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit7#lesson-3": [
    {
      "stem": "Fill the blank: The more general version is a _____ : a single encoder-decoder trained jointly across dozens or hundreds of language pairs at once, sharing one representation space.",
      "choices": [
        "multilingual model",
        "bag-of-words model",
        "span-based",
        "sampling strategy"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “multilingual model”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: mBART and Meta's _____ (No Language Left Behind, which explicitly targeted underserved languages including Kreyòl, Swahili, and other African and South Asian languages with historically little translation-model investment) work this way.",
      "choices": [
        "Input guardrails",
        "NLLB",
        "language modeling",
        "character-level"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “NLLB”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ summarization selects existing sentences (or spans) from the source and stitches them together verbatim; abstractive summarization generates new sentences that may paraphrase, compress, or synthesize across multiple source sentences.",
      "choices": [
        "reranker",
        "Extractive",
        "Greedy decoding",
        "add-k smoothing"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Extractive”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Extractive summarization selects existing sentences (or spans) from the source and stitches them together verbatim; _____ summarization generates new sentences that may paraphrase, compress, or synthesize across multiple source sentences.",
      "choices": [
        "Skip-gram",
        "chunk",
        "abstractive",
        "causal language modeling (CLM)"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “abstractive”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Low-resource and production realities\" teaches?",
      "choices": [
        "Transfer and multilingual models (mBART, NLLB) let a low-resource pair borrow structure from resource-rich neighbors , and enable zero-shot translation between pairs that were never directly paired in training data.",
        "Gradient clipping and truncated BPTT keep training stable and affordable on effectively unbounded streaming text; variational dropout regularizes without corrupting the recurrent memory the way per-timestep dropout does.",
        "BiLSTM-CRF (2015–2018) paired neural feature extraction with a CRF's transition constraints and was the dominant clinical NER architecture before BERT.",
        "Because the dot product in cosine similarity only accumulates over shared nonzero terms, it is cheap to compute even on very high-dimensional sparse vectors."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Low-resource and production realities\" teaches?",
      "choices": [
        "Chunk size is a trade-off, not a solved parameter — too large dilutes relevance and wastes prompt budget, too small strips away needed context; overlap between chunks prevents facts from being split at a boundary.",
        "Back-translation helps only as far as the reverse model is competent — with a weak reverse model (the norm for pairs like Rohingya), it bakes in a systematic, self-reinforcing bias rather than harmless noise.",
        "Term frequency variants (raw, log-scaled, augmented) all measure local prominence; log-scaling and augmentation both damp the effect of a term repeating many times in one document.",
        "A note can belong to multiple specialties at once, making note-routing a multi-label problem (independent per-label sigmoids), not a multi-class one forcing a single label."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A team building a Rohingya-English translation system has very little parallel data, so they back-translate a large body of monolingual English incident reports into synthetic Rohingya using a reverse (English-to-Rohingya) model — but that reverse model itself was trained on almost no data and is quite weak. What is the most likely outcom",
      "choices": [
        "The forward model improves roughly as much as it would with an equal amount of genuine parallel data, since the English side is real.",
        "The forward model learns to reproduce the weak reverse model's systematic errors as if they were valid Rohingya, because it has no way to distinguish synthetic source noi",
        "Back-translation has no effect either way, since only the reverse model's quality matters, not the forward model's.",
        "The forward model will automatically detect and discard the lowest-quality synthetic pairs during training."
      ],
      "correct": 1,
      "explain": "Back-translation's genuine target side (real English) is a real benefit only if the synthetic source side is a reasonably faithful rendering. When the reverse model is weak, its systematic mistakes — wrong morphology, wrong word choice patterns — appear consistently across the whole synthetic corpus, and the forward model has no signal telling it \"this source sentence is synthetic and flawed\"; it ",
      "difficulty": "hard"
    },
    {
      "stem": "This hierarchical summarization pipeline chunks a long incident-report feed and looks correct on a quick read: it chunks, summarizes each chunk, then summarizes the chunk-summaries. It passes on a five-sentence test report. Complete the missing piece so it also holds up on a fifty-sentence feed where a critical detail (a specific missing-",
      "choices": [
        "step = max_per_chunk - overlap — so consecutive chunks share overlap sentences instead of starting immediately after the previous chunk ends.",
        "step = max_per_chunk + overlap — so chunks are spaced further apart to cover the document faster.",
        "No change needed; the loop already produces overlapping chunks because range() handles it automatically.",
        "step = max_per_chunk // 2 , hard-coded, regardless of the overlap parameter."
      ],
      "correct": 0,
      "explain": "With step = max_per_chunk , chunks are back-to-back with zero overlap, so a sentence sitting exactly at a chunk boundary is fully contained in only one chunk — that's fine on its own, but it means each chunk's summarizer sees that boundary sentence with no surrounding context from the neighboring chunk, and a heuristic or model-based summarizer that ranks sentences by local salience can easily ran",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit8#lesson-1": [
    {
      "stem": "A joint ABSA model that tags tokens with an extended BIO scheme (B-POS, I-POS, B-NEG, I-NEG, B-NEU, I-NEU, O) always outperforms a two-stage pipeline (separate aspect extractor + sentiment classifier) on every deployment metric that matters.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Joint models typically win on F1 by avoiding error propagation, but a pipeline offers better interpretability — you can inspect the aspect-extraction stage independently from the sentiment stage, which matters when an analyst needs to audit or dispute a dashboard number. For a system with a human-review requirement, that inspectability can outweigh a few points of F1. The tempting e",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ assigns one label to a whole review or ticket; it's cheap and it's what you get for free from a generic classifier, but it's blind to mixed opinions like the one above.",
      "choices": [
        "linear-chain Conditional Random Field",
        "Document-level sentiment",
        "greedy decoding",
        "Slot filling"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Document-level sentiment”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is a sequence-labeling problem, structurally identical to the NER tagging you built in Course 3 Unit 6 — instead of a BIO scheme over person/organization/location spans, you tag BIO over aspect-term spans: B-ASP, I-ASP, O.",
      "choices": [
        "Aspect term extraction",
        "Hidden Markov Models",
        "Over-translation",
        "bag-of-words model"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Aspect term extraction”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Given the extracted spans, _____ is a per-span classification problem: for each aspect term, look at a window of surrounding context and predict positive / negative / neutral.",
      "choices": [
        "Beam search",
        "multilingual model",
        "Adaptive softmax",
        "aspect sentiment classification"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “aspect sentiment classification”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Sentiment and aspect-based opinion mining\" teaches?",
      "choices": [
        "Case folding helps sparse bag-of-words models but can delete shouting/emphasis signal that a moderation classifier specifically needs.",
        "RAG beats pure parametric generation on stale facts (re-index a changed doc instead of re-training a model) and beats pure keyword search on paraphrase (dense embeddings catch semantic matches BM25 misses) — hybrid retrieval (BM25",
        "Document-level sentiment loses information a business needs whenever a review is mixed, which is common — aspect-level granularity is what turns raw text into an actionable signal.",
        "Whitespace tokenization fails on contractions, multi-word entities, glued punctuation, and glued emoji — all common in social posts."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Sentiment and aspect-based opinion mining\" teaches?",
      "choices": [
        "ABSA is two subtasks: aspect term extraction (sequence tagging, like NER) and per-aspect sentiment classification, solvable as a pipeline (simpler, error-propagates) or a joint model (better accuracy, extended BIO tag set: B-POS/I",
        "Clinical notes are dominated by O tokens (often 90%+), which makes token-level accuracy a misleading training and evaluation signal from the very first lesson of this unit.",
        "[CLS] pooling turns a variable-length sequence into one fixed vector for BERT's classification head; mean pooling is a viable alternative but not the trained default.",
        "A linear-chain CRF fixes this by scoring whole tag sequences with emission + transition scores, and Viterbi decoding finds the best legal sequence in polynomial time via dynamic programming."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A review reads: \"Support was rude, but they refunded me the same day.\" A document-level sentiment classifier labels this \"neutral.\" What is the most accurate diagnosis of the problem?",
      "choices": [
        "The classifier's training data was too small.",
        "Averaging two contradictory clause-level sentiments into one label discards actionable information about which specific aspects (support manner vs. refund process) are fa",
        "The word \"neutral\" should never appear in a sentiment model's output space.",
        "The sentence needs to be translated before classification."
      ],
      "correct": 1,
      "explain": "This is the core ABSA motivation: document-level labels can be technically defensible (the clauses do roughly cancel) while being operationally useless, because they hide which aspect is the problem. A product team can't fix \"neutral.\" A (training data size) is a plausible-sounding but wrong diagnosis — the issue isn't model capacity, it's that the label space itself (one scalar per document) can'",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit8#lesson-2": [
    {
      "stem": "Fill the blank: _____ is sequence labeling — BIO tags again, the same mechanism as ABSA's aspect extraction and Unit 6's NER — pulling out the arguments the intent handler needs: an order number, a product SKU, a date range.",
      "choices": [
        "NLLB",
        "Greedy decoding",
        "Slot filling",
        "language modeling"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Slot filling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ screen the user's message before it reaches the model: is this a jailbreak attempt, a request for something the assistant shouldn't do (process a real payment, delete an account without verification), or PII that shouldn't be logged verbatim.",
      "choices": [
        "Input guardrails",
        "chrF",
        "joint model",
        "sampling strategy"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Input guardrails”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ screen what the model wants to say before it's shown to the customer: is it about to promise a refund policy it has no authority to promise, invent a tracking number, or leak a system prompt.",
      "choices": [
        "Greedy decoding",
        "Unicode normalisation",
        "Output guardrails",
        "Retrieval misses"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Output guardrails”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Conversational systems\" teaches?",
      "choices": [
        "Weight tying shares the embedding and projection matrices, roughly halving parameters in embedding-dominated small models, with a side benefit of a slight regularizing effect on perplexity.",
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight — TF-IDF corrects this.",
        "ELIZA (1966) through modern LLM assistants spans two lineages — task-oriented (intent + slots + fixed backend actions) and open-domain retrieval-based — that traded flexibility for reliability in opposite directions; LLMs generate",
        "Recall should usually be prioritized over precision for adverse-event detection, since a missed event is far costlier than a false alarm a reviewer dismisses quickly."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Conversational systems\" teaches?",
      "choices": [
        "BLEU = n-gram precision × brevity penalty ; it requires exact string matches, so a valid synonym substitution can tank the score even when meaning is fully preserved.",
        "Task-oriented systems decompose into intent classification, slot filling (BIO tagging, same mechanism as NER/ABSA), and dialogue state tracking — losing state across turns is the most common source of user-visible frustration.",
        "BIOES/BILOU adds explicit end (E/L) and single-token (S/U) tags, typically buying 1–2 F1 points by giving the model a direct signal for span boundaries — at the cost of a larger tag set.",
        "ABSA is two subtasks: aspect term extraction (sequence tagging, like NER) and per-aspect sentiment classification, solvable as a pipeline (simpler, error-propagates) or a joint model (better accuracy, extended BIO tag set: B-POS/I"
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which historical conversational-system lineage does a modern bank IVR menu (\"say 'balance' or 'transfer'\") most directly descend from?",
      "choices": [
        "ELIZA's pattern-matching reflection",
        "Retrieval-based open-domain chat",
        "Task-oriented systems (intent + slot filling + fixed backend actions)",
        "Pure LLM generation"
      ],
      "correct": 2,
      "explain": "An IVR menu maps a limited set of recognized utterances to a fixed set of backend actions with required arguments (account number, transfer amount) — exactly the intent-classification-plus-slot-filling structure, just with a much more constrained recognition surface (menu options) than a modern NLU-based system. ELIZA reflected input back as questions with no backend action at all, which is the op",
      "difficulty": "hard"
    },
    {
      "stem": "This dialogue-state update is called on every turn of a multi-turn support conversation. A tester reports: \"I told it my order number in turn 1, then in turn 3 I said 'actually make it express shipping' and it forgot my order number entirely.\" Find the bug.",
      "choices": [
        "classify_intent is being called before fill_slots .",
        "state = new_slots overwrites the entire dialogue state with only the current turn's slots instead of merging, so any slot not mentioned in the current utterance (like an ",
        "The function is missing a call to a sentiment classifier.",
        "utterance should be lowercased before parsing."
      ],
      "correct": 1,
      "explain": "Dialogue state has to accumulate across turns — the fix is state = {**state, **new_slots} , merging new slots into the existing frame so slots filled earlier persist unless explicitly overwritten. This is precisely the \"as I already told you\" failure named in Lesson 2: losing accumulated state is the most common source of multi-turn frustration. The order of intent classification vs. slot filling ",
      "difficulty": "hard"
    },
    {
      "stem": "A support assistant is asked \"what's the current firmware version for the X200?\" The assistant, running as pure parametric generation with no retrieval, answers confidently with a version number that was correct eight months ago but is now two releases out of date. What is the most precise explanation for this failure?",
      "choices": [
        "The model wasn't fine-tuned on enough firmware-related examples.",
        "The model's parameters encode a frozen snapshot of its training data, so facts that changed after training (or were never in it) can't be reflected without external groun",
        "The temperature setting was too high during generation.",
        "The tokenizer failed to recognize \"X200\" as a product name."
      ],
      "correct": 1,
      "explain": "This is the structural argument from Lesson 2: no amount of fine-tuning quality fixes a fact that postdates the training cutoff, because the model has no mechanism to know time has passed. Only retrieval (Lesson 3) or re-training closes that gap, and re-training is far more expensive than re-indexing a document. More fine-tuning examples (A) would help the model phrase firmware-version answers mor",
      "difficulty": "hard"
    }
  ],
  "course-3-text-processing/unit8#lesson-3": [
    {
      "stem": "Fill the blank: Top-k retrieval is often followed by a _____ — a heavier cross-encoder (introduced here too) that looks at the query and each candidate chunk jointly rather than as separately-embedded vectors, and re-scores them for relevance.",
      "choices": [
        "reranker",
        "chrF",
        "Greedy decoding",
        "in-context learning (ICL)"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “reranker”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Pure _____ (Unit 2's TF-IDF / BM25) fails differently — it fails on paraphrase.",
      "choices": [
        "distributional hypothesis",
        "Top-k sampling",
        "cross-attention",
        "keyword retrieval"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “keyword retrieval”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: In practice, the strongest retrieval layer is _____ : BM25 (Unit 2) alongside dense embedding search, with scores combined (commonly a weighted sum or reciprocal rank fusion).",
      "choices": [
        "Greedy decoding",
        "hybrid",
        "n-grams",
        "embedding layer"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “hybrid”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ : the right chunk exists in the store but doesn't surface in top-k, because the chunking split the fact awkwardly, or the query's phrasing is too far from the document's in embedding space.",
      "choices": [
        "greedy decoding",
        "Hidden Markov Models",
        "Named entity recognition",
        "Retrieval misses"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Retrieval misses”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Retrieval-augmented generation\" teaches?",
      "choices": [
        "Bag-of-words maps each document to a vector of term counts over a fixed vocabulary — the vector-space model — discarding all word order in the process.",
        "RAG's pipeline is chunk → embed → index → retrieve top-k → rerank → stuff into prompt → generate with citations — every stage reuses a mechanism taught earlier in this course, which is why this is the capstone lesson.",
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight — TF-IDF corrects this.",
        "Constrained decoding — masking illegal transitions at inference time without learning a transition matrix — gets most of a CRF's benefit at a fraction of the training cost."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Retrieval-augmented generation\" teaches?",
      "choices": [
        "Evaluate task success rate separately from turn-level accuracy — perfect per-turn scores can still add up to a failed conversation if state tracking drops something between turns.",
        "Intrinsic evaluation (analogy, similarity benchmarks) and extrinsic evaluation (downstream task performance) can disagree — always check the downstream metric that actually matters for the deployed system.",
        "RAG beats pure parametric generation on stale facts (re-index a changed doc instead of re-training a model) and beats pure keyword search on paraphrase (dense embeddings catch semantic matches BM25 misses) — hybrid retrieval (BM25",
        "NFKC normalisation is a security control for moderation systems , not just cosmetic cleanup — it closes homoglyph and compatibility-character evasions of keyword filters."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A customer asks \"can I get money back if the thing I bought is broken\" and a keyword-only BM25 retriever fails to surface the policy document phrased \"defective units are eligible for a refund,\" because there's almost no lexical overlap between the query and the document. This is exactly the gap that retrieval closes, by matching on meani",
      "choices": [
        "dense (embedding-based)",
        "inverted-index",
        "alphabetical",
        "rule-based"
      ],
      "correct": 0,
      "explain": "Sentence embeddings place \"money back\" and \"refund,\" or \"broken\" and \"defective,\" near each other in vector space even with zero shared vocabulary, which is exactly what BM25's term-overlap scoring cannot do. This is why production RAG systems typically hybridize BM25 with dense retrieval rather than picking one. \"Inverted-index\" (B) names BM25's underlying data structure, not a fix for its blind ",
      "difficulty": "hard"
    },
    {
      "stem": "Combining ideas from Lesson 2 and Lesson 3: a company builds a support assistant with an intent classifier, slot filling, and dialogue state tracking, and connects its \"answer a factual question\" intent to a RAG pipeline over the product docs. During evaluation, the assistant correctly classifies intent and fills slots on every turn, retr",
      "choices": [
        "The intent classifier is broken and needs retraining.",
        "Retrieval is finding the right documents nearly every time, and slots/intent are being extracted correctly, so the gap is most likely downstream — the generator ignoring ",
        "The vector index needs to be rebuilt with more chunks.",
        "BM25 should be removed from the hybrid retriever since dense retrieval is doing all the work."
      ],
      "correct": 1,
      "explain": "This question chains Lesson 2's turn-level-vs-task-success distinction with Lesson 3's retrieval-recall-vs-faithfulness distinction. High intent/slot accuracy rules out the dialogue-parsing stage; high recall@5 rules out retrieval as the bottleneck. What's left is exactly the gap those metrics are designed to expose: the generator may be ignoring good context, producing unfaithful answers, or losi",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit1#lesson-1": [
    {
      "stem": "Because satellite sensors use 12-bit or 16-bit depth rather than 8-bit, they can capture a wider range of colors than a normal camera.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Higher bit depth doesn't widen the range of physical values captured (that's set by the sensor's dynamic range and the wavelengths it samples) — it increases the number of distinct levels used to represent whatever range is captured, preserving finer gradations rather than crushing them into fewer buckets. The tempting reasoning is that \"more bits = sees more,\" but bit depth is abou",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Each position in the array is called a _____ (short for \"picture element\"), and each pixel holds one or more numeric values describing the brightness or color measured at that location on a sensor.",
      "choices": [
        "Bilinear",
        "blurry",
        "Transfer learning",
        "pixel"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “pixel”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: For an ordinary photograph, the array has three dimensions: height, width, and _____ .",
      "choices": [
        "channels",
        "Horizontal flip",
        "cross-correlation",
        "R-CNN"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “channels”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: This is called _____ or HWC ordering, and it's what you get from most image-loading libraries and from raw camera files.",
      "choices": [
        "Semantic segmentation",
        "Horizontal flip",
        "kernel",
        "channel-last"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “channel-last”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"How an image becomes numbers\" teaches?",
      "choices": [
        "Images are (H, W, C) tensors , and the channel axis position (last for most libraries, first for PyTorch) is a convention you must match to whatever code consumes the array.",
        "Shadow deployment and A/B rollout, never a direct swap — a new model proves itself on live traffic before it can affect a single customer's bill.",
        "Separability turns an O(k²) 2-D convolution into two O(k) 1-D passes , a real throughput win at line-rate frame rates.",
        "Generative vs. discriminative is a distribution question: discriminative models learn p(y|x) , generative models learn (or learn to sample from) p(x) — a strictly harder target, which is why generative failures look like \"plausibl"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"How an image becomes numbers\" teaches?",
      "choices": [
        "3D U-Net brings the encoder-decoder shape to true volumetric data , but full-volume 3-D convolution rarely fits in GPU memory, so patch-based processing with overlapping, blended patches is the standard workaround; SAM-style promp",
        "Active learning spends human labelling time on the frames that move the model — highest-uncertainty crops, not random sampling — and always folds labels back through human confirmation, never silent self-labelling.",
        "RGB entangles brightness, hue, and saturation ; HSV and Lab untangle them for different purposes — HSV for hue/brightness-based masking, Lab for perceptual color matching.",
        "Bit depth sets dynamic range : 8-bit (256 levels) is fine for display, but satellite sensors use 12–16 bit (thousands of levels) to preserve subtle reflectance differences that matter for measurement, not just viewing."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"How an image becomes numbers\" teaches?",
      "choices": [
        "Scale before you standardise : convert 12/16-bit digital numbers to a bounded range first, then apply z-score normalisation, not the other way around.",
        "Anchor-free detectors (CenterNet, FCOS) predict centers directly instead of refining hand-tuned anchor priors; DETR reframes detection as transformer-based set prediction, removing NMS entirely at a compute-latency cost.",
        "Multispectral means more than RGB — Sentinel-2's 13 bands extend into near-infrared and shortwave infrared, wavelengths invisible to the eye but diagnostic for vegetation, water, and soil.",
        "HOG describes a whole patch's shape as a grid of gradient histograms , making it suited to template-style matching of component or defect silhouettes rather than sparse point matching."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A Sentinel-2 tile is stored as a NumPy array with shape (512, 512, 13) . What does this ordering tell you?",
      "choices": [
        "It's channel-first (CHW), the default PyTorch expects.",
        "It's channel-last (HWC): 512 rows, 512 columns, 13 bands per pixel.",
        "It has 512 bands and only 13 spatial pixels.",
        "The shape doesn't indicate ordering; that's set by the file format alone."
      ],
      "correct": 1,
      "explain": "With height and width equal (512, 512) and a distinct trailing value (13) that matches Sentinel-2's known band count, the channel axis is last — HWC, the common convention for image libraries and raw satellite products. A is wrong because CHW would put 13 first, i.e. (13, 512, 512) — the opposite of what's shown. The array's axis order is a real property of how it was constructed, not something fi",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit1#lesson-2": [
    {
      "stem": "Fill the blank: It helps to be precise about what a _____ is: a coordinate system for describing color, with each space designed around a different goal.",
      "choices": [
        "color space",
        "true positive",
        "SSD",
        "Autoregressive models"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “color space”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Before reaching for any index, the fastest diagnostic is a _____ : a count of how many pixels in a tile fall into each value bucket, plotted separately for each band.",
      "choices": [
        "NDWI",
        "Swin Transformer",
        "DeiT",
        "per-channel histogram"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “per-channel histogram”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A _____ fixes this by combining two bands so that the confounding factors partly cancel out, leaving a number that tracks the property you actually care about.",
      "choices": [
        "blurry",
        "kernel",
        "Object detection",
        "spectral index"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “spectral index”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Normalized Difference Water Index) swaps in green and NIR: NDWI = (Green − NIR) / (Green + NIR) .",
      "choices": [
        "position embedding",
        "NDWI",
        "patch embedding",
        "Object detection"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “NDWI”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Color spaces, channels, and spectral indices\" teaches?",
      "choices": [
        "Closing the one-stage/two-stage accuracy gap does not remove the need for redundancy — multi-camera coverage, sensor fusion, and temporal tracking — in a safety-critical stack.",
        "Pixel-difference comparison fails under any rotation or lighting shift because it has no notion of \"same physical point\" — feature matching solves exactly that correspondence problem.",
        "DeiT closes ViT's data gap through distillation , not architecture — a distillation token learns from a pretrained CNN teacher, letting a ViT match CNN accuracy on ImageNet-1k alone.",
        "RGB entangles brightness, hue, and saturation ; HSV and Lab untangle them for different purposes — HSV for hue/brightness-based masking, Lab for perceptual color matching."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Color spaces, channels, and spectral indices\" teaches?",
      "choices": [
        "Vegetation stress is often invisible in RGB but visible in the red/NIR contrast, because that's the physical mechanism (chlorophyll absorption vs. cell-structure scattering) the stress actually disrupts.",
        "Epsilon-prediction plus plain MSE is the whole training objective; it works because predicting zero-mean noise is a better-conditioned regression target than predicting a raw image whose statistics vary with t .",
        "Depthwise-separable convolutions split spatial filtering from channel mixing , cutting parameters and FLOPs by roughly 8-9x for typical 3×3, wide-channel layers — the core MobileNet trick.",
        "Swin trades global attention for local-window attention plus a hierarchy , restoring linear cost and a multi-scale feature pyramid that detection and segmentation heads expect; shifted windows let information cross window boundari"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "NDVI is computed as (NIR − Red) / (NIR + Red). A field of dense, healthy crops will show a NDVI value that trends toward because healthy chlorophyll strongly scatters NIR while absorbing red light for photosynthesis.",
      "choices": [
        "−1",
        "0",
        "+1",
        "It's undefined for vegetation"
      ],
      "correct": 2,
      "explain": "Healthy vegetation reflects far more NIR than red, so the numerator (NIR − Red) is large and positive relative to the denominator, pushing the ratio toward its upper bound of +1. 0 (option B) is closer to what bare soil or built-up surfaces produce, where red and NIR reflectance are more similar; −1 (option A) would require NIR to be much lower than red, which happens for surfaces like clear water",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit1#lesson-3": [
    {
      "stem": "It's fine to normalize a 13-band Sentinel-2 tile using the standard ImageNet per-channel mean and standard deviation values, since normalisation is normalisation regardless of the data.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. ImageNet's mean/std were computed from three-channel RGB web photographs; they describe that dataset's color statistics specifically, and a 13-band satellite stack has ten channels (like NIR and SWIR) with no ImageNet equivalent at all, plus different statistics even in the three roughly-corresponding channels. The appeal of \"it's just normalisation\" ignores that the whole point of ",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ interpolation takes a weighted average of the four nearest pixels, giving smoother results appropriate for continuous-valued imagery.",
      "choices": [
        "Faster R-CNN",
        "Bilinear",
        "Semantic segmentation",
        "Resampling"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Bilinear”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ extends that averaging to a 4×4 neighborhood with a smoother weighting curve, typically sharper than bilinear at the cost of more compute.",
      "choices": [
        "Bicubic",
        "Difference of Gaussians",
        "pixel",
        "RoIAlign"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Bicubic”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The standard approach is _____ : cut the scene into fixed-size patches (say 256×256 pixels) for the model to consume individually.",
      "choices": [
        "Swin Transformer",
        "semantic segmentation",
        "tiling",
        "Scale invariance"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “tiling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Preprocessing and normalisation for vision models\" teaches?",
      "choices": [
        "U-Net's skip connections concatenate high-resolution encoder features into the matching decoder stage, which is why U-Net (and its many descendants) remains the medical-imaging default — it recovers boundary precision that a bottl",
        "Edge is forced, not chosen for its own sake: bandwidth limits, sub-second latency requirements, and minimizing raw video leaving the premises all point the same direction — detect locally, ship only derived events to the cloud.",
        "Squeeze-and-excitation adds per-channel attention for a few thousand parameters, letting the network reweight which channels matter per image.",
        "Match interpolation to data type : nearest-neighbor for categorical masks, bilinear/bicubic for continuous reflectance, and always area-average (or blur first) when downsampling to avoid aliasing."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Preprocessing and normalisation for vision models\" teaches?",
      "choices": [
        "Epsilon-prediction plus plain MSE is the whole training objective; it works because predicting zero-mean noise is a better-conditioned regression target than predicting a raw image whose statistics vary with t .",
        "ImageNet normalisation statistics are wrong for satellite data — compute your own per-channel mean and std from your actual training tiles, especially for bands (NIR, SWIR) ImageNet never had.",
        "Precision-recall for generative models separates realism from coverage , giving a way to name mode collapse (low recall) as distinct from poor sample quality (low precision) — FID alone conflates the two.",
        "Spatial resolution (meters/pixel) sets a hard ceiling on detectability — 10 m Sentinel-2 pixels can separate a field from a forest but not one tree from another."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "This function is meant to preprocess satellite tiles without normalisation leakage, but it has a bug. Identify the problem.",
      "choices": [
        "The mean/std are computed over all axes at once instead of per-channel.",
        "The mean and std are computed from all_tiles before the train/test split, leaking test statistics into training normalisation.",
        "The split should happen before the tiles are stacked into an array.",
        "Standard deviation should never be added with a small epsilon."
      ],
      "correct": 1,
      "explain": "mean and std are computed from stacked , which includes every tile before the split — so the test set's own pixel statistics have already influenced the numbers used to normalise the training set. The fix: call train_test_split first, then compute mean / std only from train_tiles , and apply those same frozen values to both splits. axis=(0,1,2) is actually correct here — it collapses the tile-inde",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit2#lesson-1": [
    {
      "stem": "Separating a 2-D Gaussian convolution into two 1-D passes (rows then columns) produces a mathematically different result than applying the full 2-D kernel directly.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Because a 2-D Gaussian factors exactly as the outer product of two identical 1-D Gaussians, convolving with the two 1-D kernels in sequence produces the identical numerical result as the full 2-D convolution — separability is a computational shortcut, not an approximation. It's tempting to assume any decomposition trades accuracy for speed, but separability here is an algebraic iden",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A _____ is a small numerical grid, called a kernel , that slides across an image and replaces each pixel with a weighted sum of its neighborhood.",
      "choices": [
        "U-Net",
        "RoIAlign",
        "channels",
        "linear filter"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “linear filter”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A linear filter is a small numerical grid, called a _____ , that slides across an image and replaces each pixel with a weighted sum of its neighborhood.",
      "choices": [
        "kernel",
        "Tversky loss",
        "transposed convolution",
        "Test-time augmentation"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “kernel”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That sum-of-products-over-a-sliding-window operation is what Course 1 Unit 6 called _____ when it was the operation a CNN learns the weights for.",
      "choices": [
        "unsharp masking",
        "convolution",
        "Difference of Gaussians",
        "Illumination invariance"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “convolution”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Convolution, filtering, and the frequency view\" teaches?",
      "choices": [
        "DDIM's non-Markovian reformulation buys a 20-50x sampling speedup over DDPM by skipping steps, but diffusion is still far slower per image than a GAN's single forward pass — a real deployment cost, not a footnote.",
        "Precision-recall for generative models separates realism from coverage , giving a way to name mode collapse (low recall) as distinct from poor sample quality (low precision) — FID alone conflates the two.",
        "Convolution and correlation differ only by a 180° kernel flip , and are identical for the symmetric kernels — box, Gaussian, Laplacian — that dominate classical filtering.",
        "GAN failure modes have names because they have causes: mode collapse (generator exploits a narrow trick), non-convergence (no fixed point), vanishing gradients (an over-strong discriminator starves its own signal) — each has a mat"
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Convolution, filtering, and the frequency view\" teaches?",
      "choices": [
        "IoU is intersection area over union area; it is the yardstick for \"is this predicted box a match\" at a chosen threshold (commonly 0.5).",
        "Gaussian beats box smoothing because it has no hard cutoff (no ringing/false edges), is rotationally symmetric, and — unlike most smoothing shapes — is separable.",
        "Normalisation leakage happens when statistics are computed across train and test data together — always split first, then compute stats only from the training partition.",
        "Fast R-CNN shares one backbone pass across all proposals and uses RoI pooling to extract a fixed-size feature slice per variable-size proposal, cutting inference to under two seconds per image."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Convolution, filtering, and the frequency view\" teaches?",
      "choices": [
        "U-Net's skip connections concatenate high-resolution encoder features into the matching decoder stage, which is why U-Net (and its many descendants) remains the medical-imaging default — it recovers boundary precision that a bottl",
        "Depthwise-separable convolutions split spatial filtering from channel mixing , cutting parameters and FLOPs by roughly 8-9x for typical 3×3, wide-channel layers — the core MobileNet trick.",
        "Separability turns an O(k²) 2-D convolution into two O(k) 1-D passes , a real throughput win at line-rate frame rates.",
        "Bit depth sets dynamic range : 8-bit (256 levels) is fine for display, but satellite sensors use 12–16 bit (thousands of levels) to preserve subtle reflectance differences that matter for measurement, not just viewing."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Why is a Gaussian kernel generally preferred over a box kernel for smoothing an inspection image before edge detection?",
      "choices": [
        "The Gaussian kernel is not separable, so it captures diagonal structure the box filter misses.",
        "The Gaussian's smooth falloff avoids the ringing/false-edge artifacts a box filter's hard cutoff can introduce, while still being separable for speed.",
        "The box filter cannot be implemented as a convolution, only the Gaussian can.",
        "The Gaussian kernel always uses fewer multiply-adds than a box kernel of the same size."
      ],
      "correct": 1,
      "explain": "The Gaussian's bell-curve weighting has no hard spatial cutoff, so its frequency response lacks the ringing (false edges) a box filter's rectangular window produces, and it remains separable into two 1-D passes for the same speed benefit as a box filter. A is wrong on two counts: the Gaussian is separable, and separability is precisely why it's fast, not a downside. D is wrong — a box and Gaussian",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit2#lesson-2": [
    {
      "stem": "Fill the blank: The _____ estimates the horizontal and vertical derivatives with two 3×3 kernels:",
      "choices": [
        "Focal loss",
        "patches",
        "Sobel operator",
        "HOG"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Sobel operator”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: First, _____ with a Gaussian (Lesson 1) to suppress sensor noise before differentiating it — differentiation amplifies noise, so this step is not optional.",
      "choices": [
        "Test-time augmentation",
        "smooth",
        "3D U-Net",
        "cross-correlation"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “smooth”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Second, compute the _____ magnitude and orientation via Sobel.",
      "choices": [
        "linear filter",
        "box filter",
        "gradient",
        "kernel"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “gradient”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ formalizes this with the structure tensor , a 2×2 matrix built from local gradient products averaged over a window:",
      "choices": [
        "Harris detector",
        "blurry",
        "Tversky loss",
        "patch embedding"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Harris detector”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Edge and corner detection\" teaches?",
      "choices": [
        "Dilated/atrous convolutions (DeepLab) grow the receptive field without downsampling at all, trading the recover-detail problem for a compute/memory cost per layer instead.",
        "Sobel estimates directional derivatives with a built-in smoothing weight (1-2-1) , making it more noise-robust than the flat-weighted Prewitt operator, at the same 3×3 cost.",
        "Each architecture solved one specific blocker : AlexNet solved trainability at scale (ReLU, dropout, GPUs), VGG solved \"how do I add depth systematically\" (uniform 3×3 stacks), Inception solved fixed-receptive-field waste (multi-b",
        "For most real catalogues, backbone choice is a latency/data/infra decision , not an architecture-superiority question — a strong CNN and a strong ViT variant are often within noise of each other."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Hysteresis thresholding in Canny uses two thresholds instead of one primarily to:",
      "choices": [
        "Speed up the computation by skipping the gradient magnitude step for weak pixels.",
        "Detect corners in addition to edges within the same pass.",
        "Keep weak-but-connected edge segments that dip below a single hard cutoff in places, while still discarding isolated weak responses like noise.",
        "Replace the need for a prior Gaussian smoothing step."
      ],
      "correct": 2,
      "explain": "A real edge can have a locally weak segment — a shadow crossing it, for instance — that would be lost under one hard threshold. By keeping any weak pixel that connects to a confirmed strong edge, hysteresis preserves that continuity while still dropping isolated weak-only responses, which are more likely noise. D is a common misread: hysteresis thresholding is entirely separate from, and comes aft",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit2#lesson-3": [
    {
      "stem": "RANSAC works by computing a geometric transform from every possible pair of matched keypoints and averaging the results together.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. RANSAC repeatedly samples a small minimal subset of matches, fits a candidate transform from just that subset, and counts how many of the other matches agree with it within a tolerance (\"inliers\"); the transform with the most inliers across many random trials is kept, and only its inlier matches are trusted going forward. Averaging over every match would be defeated by exactly the b",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That's the job of a _____ : a numerical fingerprint computed around a keypoint that stays recognizably similar even when the image around it has been rotated, rescaled, or relit.",
      "choices": [
        "feature descriptor",
        "8-bit depth",
        "Generative adversarial networks",
        "transposed convolution"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “feature descriptor”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ : a descriptor should not care whether the LED ring light ran a touch brighter today, so it should be built from gradient directions and relative contrast rather than raw pixel brightness.",
      "choices": [
        "RoI Align",
        "Illumination invariance",
        "true positive",
        "patches"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Illumination invariance”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ : the descriptor should be computed relative to a keypoint's own dominant orientation, not relative to the image's fixed x-axis, so a board rotated in its fixture still matches.",
      "choices": [
        "Bilinear",
        "Rotation invariance",
        "IoU (Intersection over Union)",
        "YOLO"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Rotation invariance”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Feature descriptors and the classical recognition pipeline\" teaches?",
      "choices": [
        "Shadow deployment and A/B rollout, never a direct swap — a new model proves itself on live traffic before it can affect a single customer's bill.",
        "Pixel-difference comparison fails under any rotation or lighting shift because it has no notion of \"same physical point\" — feature matching solves exactly that correspondence problem.",
        "A residual block learns F(x), not H(x) — reformulating the target as a correction to identity makes near-identity mappings trivially reachable.",
        "Projection shortcuts (1×1 conv) are required whenever a block changes channel count or spatial resolution — which is every stage transition in a real backbone."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Feature descriptors and the classical recognition pipeline\" teaches?",
      "choices": [
        "Patchify is the only vision-specific step. A 16×16 patch becomes one token, flattened and linearly projected — the transformer encoder that follows is identical in kind to the one Course 2 used for text.",
        "Difference of Gaussians across a scale pyramid finds a blob's position and size together , the same scale-space idea SIFT reuses for scale-invariant keypoints in Lesson 3.",
        "Hysteresis thresholding keeps weak-but-connected edge pixels and drops weak-and-isolated ones , preserving edges that dip below a single hard threshold in only part of their length.",
        "A useful descriptor is illumination-, rotation-, and (often) scale-invariant by construction — built from local gradient orientation and relative contrast, anchored to the keypoint's own dominant direction and detection scale."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Feature descriptors and the classical recognition pipeline\" teaches?",
      "choices": [
        "Precision-recall for generative models separates realism from coverage , giving a way to name mode collapse (low recall) as distinct from poor sample quality (low precision) — FID alone conflates the two.",
        "Class weighting, resampling, and focal loss all attack imbalance from different angles and combine rather than substitute for each other.",
        "Spectral indices are normalized differences between two bands chosen because a target material responds to them with opposite sign or magnitude — NDVI (red/NIR) for vegetation, NDWI (green/NIR) for water.",
        "SIFT's 128-d descriptor (4×4 cells × 8 orientation bins) is thorough but costly ; ORB trades float descriptors and Euclidean distance for binary strings and Hamming distance to run at video rate on a CPU."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Why is ORB typically chosen over SIFT for a fixed-mount PCB inspection rig that needs to align a captured board to a reference layout at full camera frame rate on a CPU?",
      "choices": [
        "ORB is more scale-invariant than SIFT, which matters more than speed for a fixed camera distance.",
        "ORB's binary descriptor and Hamming-distance matching are far cheaper to compute and compare than SIFT's float descriptors and Euclidean distance, at a small cost in raw ",
        "SIFT cannot be computed on grayscale images, only ORB can.",
        "ORB does not require any keypoint detection step, unlike SIFT."
      ],
      "correct": 1,
      "explain": "ORB's BRIEF-based binary descriptors compare against each other with XOR and a bit count instead of a full floating-point Euclidean distance, and are built from cheap FAST keypoints — a large speed advantage that matters when a rig has no GPU and a hard frame-rate budget, at some cost in the descriptor's discriminative power versus SIFT's richer 128-d histogram. A is backwards for the scenario des",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit3#lesson-1": [
    {
      "stem": "The degradation problem that ResNet solves is just another name for vanishing gradients — the two terms describe the same underlying failure.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. They're related but distinct failures. Vanishing gradients is specifically about gradient magnitude shrinking to near-zero as it backpropagates through many layers, making weights barely update. The degradation problem is an optimization-landscape difficulty — deeper plain networks get harder for SGD to fit well even when gradients aren't vanishing, as He et al. showed with batch-no",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____'s constant gradient for positive inputs meant error signals stopped shrinking to nothing as they backpropagated through eight layers — sigmoid's saturating tails had made anything deeper than a handful of layers glacially slow to train.",
      "choices": [
        "patches",
        "Tversky loss",
        "per-channel histogram",
        "ReLU"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “ReLU”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: This is called the _____ , and it's distinct from vanishing gradients — a subtlety worth holding onto, since conflating the two is the single most common imprecision in how people summarize ResNet.",
      "choices": [
        "DeiT",
        "Generative adversarial networks",
        "degradation problem",
        "per-channel histogram"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “degradation problem”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Instead of asking a stack of layers to learn a full mapping H(x) from scratch, give it a shortcut connection that carries the input x forward unchanged, and let the stacked layers learn only the _____ F(x) = H(x) − x.",
      "choices": [
        "patch embedding",
        "Average Precision (AP)",
        "CLIP",
        "residual"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “residual”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The architectural lineage: LeNet to ResNet\" teaches?",
      "choices": [
        "[CLS] and 2-D position embeddings replace what convolution gave for free. Since self-attention is permutation-invariant, position embeddings are the only thing telling the model where each patch sat in the original grid.",
        "Each architecture solved one specific blocker : AlexNet solved trainability at scale (ReLU, dropout, GPUs), VGG solved \"how do I add depth systematically\" (uniform 3×3 stacks), Inception solved fixed-receptive-field waste (multi-b",
        "Sobel estimates directional derivatives with a built-in smoothing weight (1-2-1) , making it more noise-robust than the flat-weighted Prewitt operator, at the same 3×3 cost.",
        "mAP averages per-class AP , which itself summarizes the precision-recall trade-off — always inspect per-class AP separately, since a strong mean can hide a weak, safety-critical pedestrian class."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The architectural lineage: LeNet to ResNet\" teaches?",
      "choices": [
        "Two-stage detectors trade real-time speed for accuracy, particularly on small/occluded objects — a defensible choice offline, usually not for a 30+ FPS front-camera path.",
        "Boundary handling choice (zero, replicate, reflect, crop) changes pixel values near the frame edge and should be picked to avoid manufacturing false defect signals near a part's border.",
        "The degradation problem is not the same claim as vanishing gradients — it's an optimization-landscape problem where deeper plain networks get harder for SGD to fit even on training data, independent of gradient magnitude.",
        "Depthwise-separable convolutions split spatial filtering from channel mixing , cutting parameters and FLOPs by roughly 8-9x for typical 3×3, wide-channel layers — the core MobileNet trick."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The architectural lineage: LeNet to ResNet\" teaches?",
      "choices": [
        "Hysteresis thresholding keeps weak-but-connected edge pixels and drops weak-and-isolated ones , preserving edges that dip below a single hard threshold in only part of their length.",
        "Batching trades latency for throughput — bigger batches cut per-frame compute overhead but add queuing delay, so batch size is a tunable knob, not a default maximum.",
        "StyleGAN's disentangled per-resolution latent injection is what makes \"same layout, different texture\" controllable generation possible — a capability plain GANs don't offer.",
        "A residual block learns F(x), not H(x) — reformulating the target as a correction to identity makes near-identity mappings trivially reachable."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A team trains a 60-layer plain (no skip connections) CNN on camera-trap frames and finds its training accuracy is worse than a 20-layer version of the same design. Gradient magnitudes at the early layers look healthy, not vanished. What's the best explanation?",
      "choices": [
        "The 60-layer network is overfitting to the training set.",
        "The degradation problem: SGD is struggling to find a good solution (even an identity-like one) through that many stacked nonlinear layers, independent of gradient size.",
        "The learning rate is too high for a network this deep.",
        "The dataset is too small for any network deeper than 20 layers."
      ],
      "correct": 1,
      "explain": "Worse training error (not just validation error) rules out overfitting outright — an overfit model fits the training set well, it generalizes poorly. Since gradients aren't vanishing, the failure is optimization difficulty: deeper plain stacks make it harder for SGD to reach a good solution, which is precisely the degradation problem ResNet's residual connections address. A is the tempting distrac",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit3#lesson-2": [
    {
      "stem": "Fill the blank: _____ , for a CNN, means accuracy per unit of compute and memory — measured in parameters, in floating-point operations (FLOPs), and in latency on a specific chip.",
      "choices": [
        "Efficiency",
        "Inception Score",
        "per-channel histogram",
        "unsharp masking"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Efficiency”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A _____ applies one spatial filter per input channel independently — no channel mixing at all — and a following pointwise convolution (a 1×1 conv) handles the channel mixing, with no spatial extent.",
      "choices": [
        "dynamic range",
        "linear filter",
        "depthwise convolution",
        "true positive"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “depthwise convolution”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A depthwise convolution applies one spatial filter per input channel independently — no channel mixing at all — and a following _____ (a 1×1 conv) handles the channel mixing, with no spatial extent.",
      "choices": [
        "pointwise convolution",
        "Cloud deployment",
        "Focal loss",
        "cross-correlation"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “pointwise convolution”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Modern efficient architectures and design principles\" teaches?",
      "choices": [
        "Batch norm smooths the loss landscape enough to make higher learning rates and deep networks (50+ layers) reliably trainable — it's complementary to residual connections, not a substitute for them.",
        "Contrastive SSL (SimCLR, MoCo) turns augmentation into a label , using the InfoNCE loss from Course 2 to pull together two views of one image and push apart different images — useful directly for building a visual-similarity retri",
        "Match interpolation to data type : nearest-neighbor for categorical masks, bilinear/bicubic for continuous reflectance, and always area-average (or blur first) when downsampling to avoid aliasing.",
        "Patchify is the only vision-specific step. A 16×16 patch becomes one token, flattened and linearly projected — the transformer encoder that follows is identical in kind to the one Course 2 used for text."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Modern efficient architectures and design principles\" teaches?",
      "choices": [
        "Class weighting, resampling, and focal loss all attack imbalance from different angles and combine rather than substitute for each other.",
        "Depthwise-separable convolutions split spatial filtering from channel mixing , cutting parameters and FLOPs by roughly 8-9x for typical 3×3, wide-channel layers — the core MobileNet trick.",
        "Watermarking, provenance metadata, and detection are each partial and each defeatable ; deepfake detection specifically is a genuine arms race that improves as generation improves, never a solved problem to check off.",
        "StyleGAN's disentangled per-resolution latent injection is what makes \"same layout, different texture\" controllable generation possible — a capability plain GANs don't offer."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Modern efficient architectures and design principles\" teaches?",
      "choices": [
        "Squeeze-and-excitation adds per-channel attention for a few thousand parameters, letting the network reweight which channels matter per image.",
        "Horizontal flip is safe augmentation for wildlife; vertical flip is not — gravity orients real animals, so an upside-down training image teaches an impossible prior.",
        "Band math beats raw bands because it cancels out shared confounders (illumination, atmosphere) that a single band can't separate from the signal of interest.",
        "Semantic segmentation labels pixels by class only; instance segmentation additionally separates individual objects of the same class (two adjacent kidneys, several distinct lesions); panoptic segmentation unifies both, splitting \""
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A camera-trap classifier backbone applies a single standard 2D convolution to a 56×56 feature map with 64 input channels, producing 128 output channels, using a 3×3 kernel, stride 1, with padding that preserves spatial size. How many learnable weight parameters does this one convolution layer have (ignore bias)?",
      "choices": [
        "18,432",
        "36,864",
        "73,728",
        "294,912"
      ],
      "correct": 2,
      "explain": "params = 3 × 3 × 64 × 128 = 9 × 64 × 128 = 9 × 8,192 = 73,728. Output spatial size stays 56×56 because padding=1 with a 3×3 kernel and stride 1 preserves resolution, but spatial size doesn't enter the parameter count at all — parameter count depends only on kernel size and channel counts, never on the feature map's height or width. 18,432 (A) is what you'd get from 3×3×32×64 — half the channels in",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit3#lesson-3": [
    {
      "stem": "Fill the blank: _____ is fine — an animal facing left versus right carries no label information, since nothing about being a leopard depends on which way it's walking.",
      "choices": [
        "Average Precision (AP)",
        "Horizontal flip",
        "Dice coefficient",
        "Illumination invariance"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Horizontal flip”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ multiplies each example's loss by a weight inversely proportional to its class frequency, so the rare species' forty images contribute as much total gradient signal as thousands of common-species images would.",
      "choices": [
        "patch embedding",
        "spectral index",
        "channels",
        "Class-weighted cross-entropy"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Class-weighted cross-entropy”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ — oversampling rare classes or undersampling the dominant ones per epoch — achieves a similar effect at the data-loader level rather than the loss level, and is easy to combine with weighting.",
      "choices": [
        "Mask R-CNN",
        "kernel",
        "patch embedding",
        "Resampling"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Resampling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (TTA) runs several augmented copies of a single test image — a few crops, both original and horizontally flipped — through the trained model and averages the predictions.",
      "choices": [
        "Illumination invariance",
        "Dice coefficient",
        "Test-time augmentation",
        "R-CNN"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Test-time augmentation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Training a classifier that survives the real world\" teaches?",
      "choices": [
        "Classical descriptors still win in controlled QA settings — no GPU, no training data, fully explainable failures — even though learned features have overtaken them for open-world recognition.",
        "Transfer learning works across the ImageNet-to-camera-trap gap because early convolutional layers learn domain-general edges and textures; only later layers need to adapt.",
        "Precision-recall for generative models separates realism from coverage , giving a way to name mode collapse (low recall) as distinct from poor sample quality (low precision) — FID alone conflates the two.",
        "Hybrid stems split the difference. A small convolutional stem feeding into a transformer body recovers some locality prior and eases the data requirement, at modest architectural cost."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Training a classifier that survives the real world\" teaches?",
      "choices": [
        "Vision and language fuse in two concrete places: OCR-plus-text-classification to disambiguate near-identical packaging, and RAG-style natural-language query over an event index for operations staff.",
        "For most real catalogues, backbone choice is a latency/data/infra decision , not an architecture-superiority question — a strong CNN and a strong ViT variant are often within noise of each other.",
        "Horizontal flip is safe augmentation for wildlife; vertical flip is not — gravity orients real animals, so an upside-down training image teaches an impossible prior.",
        "Dense prediction creates severe class imbalance (background anchors vastly outnumber object anchors); focal loss down-weights easy examples so hard, rare object anchors dominate the gradient."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A colleague's augmentation pipeline for training a camera-trap species classifier is hurting validation accuracy compared to a no-augmentation baseline. Find the line causing the regression and explain the fix.",
      "choices": [
        "RandomResizedCrop 's scale range is the problem — it should start much lower.",
        "RandomVerticalFlip(p=0.5) is the problem — it should be removed.",
        "RandomHorizontalFlip(p=0.5) is the problem — it should be removed.",
        "ColorJitter is the problem — brightness and contrast jitter should never be used on natural images."
      ],
      "correct": 1,
      "explain": "RandomVerticalFlip trains the model on upside-down animals, which never occur in real deployment — gravity orients wildlife in every genuine frame. This teaches the network a physically impossible prior and wastes training signal on images with no real-world analogue, which is consistent with a validation-accuracy regression. The fix is to drop that line entirely; horizontal flip, crop, and color ",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit4#lesson-1": [
    {
      "stem": "A model can report a strong mAP across the vehicle, pedestrian, cyclist, and sign classes while still being meaningfully unsafe to deploy, because mAP averages away a large class-specific weakness.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 0,
      "explain": "Answer: True. mAP is the mean of per-class AP. If vehicle AP is 0.95 and pedestrian AP is 0.55, a simple average can still land around 0.80 — a number that reads as \"good\" while hiding a pedestrian-detection weakness that is the single most safety-relevant number in the whole report. This is exactly why Lesson 1 stresses reporting AP per class rather than only the mean — the mean is a convenient s",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is the task of producing, for an input image, a variable-length list of (class label, bounding box, confidence score) triples — one entry per object instance present.",
      "choices": [
        "mask head",
        "feature descriptor",
        "Object detection",
        "per-channel histogram"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Object detection”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ is the single metric that makes everything else in detection possible: it answers \"how well does this predicted box match that ground-truth box?\" with one number between 0 and 1.",
      "choices": [
        "unsharp masking",
        "Generative adversarial networks",
        "Intersection over Union (IoU)",
        "Object detection"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Intersection over Union (IoU)”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A predicted detection is only counted as a _____ if its class matches the ground-truth object and its IoU with that ground truth clears the threshold (0.5 is standard for PASCAL VOC-style scoring, COCO averages over 0.5 through 0.95).",
      "choices": [
        "img2img",
        "Illumination invariance",
        "true positive",
        "R-CNN"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “true positive”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"From classification to localization: the detection problem\" teaches?",
      "choices": [
        "Multispectral means more than RGB — Sentinel-2's 13 bands extend into near-infrared and shortwave infrared, wavelengths invisible to the eye but diagnostic for vegetation, water, and soil.",
        "ConvNeXt shows training recipe, not attention, explained much of ViT's reported edge — a modernized pure CNN matches transformer backbones at comparable scale.",
        "Detection outputs a variable-length list of (class, box, score) triples per image — the core architectural challenge is making a fixed-size network emit an unbounded set.",
        "Semantic segmentation labels pixels by class only; instance segmentation additionally separates individual objects of the same class (two adjacent kidneys, several distinct lesions); panoptic segmentation unifies both, splitting \""
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"From classification to localization: the detection problem\" teaches?",
      "choices": [
        "The U-Net backbone is unchanged from Unit 5 except for timestep conditioning injected into every block — the same coarse+fine fusion that served segmentation now serves denoising.",
        "Latent diffusion moves the entire denoising loop into a compressed VAE latent space , which is the difference between \"runs on a data-center cluster\" and \"runs on a single consumer GPU.\"",
        "IoU is intersection area over union area; it is the yardstick for \"is this predicted box a match\" at a chosen threshold (commonly 0.5).",
        "RoIAlign's bilinear-interpolated feature sampling (versus RoI pooling's coordinate rounding) was the specific fix that made per-pixel mask accuracy viable — rounding errors a box regressor tolerates are fatal to a mask."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"From classification to localization: the detection problem\" teaches?",
      "choices": [
        "Sobel estimates directional derivatives with a built-in smoothing weight (1-2-1) , making it more noise-robust than the flat-weighted Prewitt operator, at the same 3×3 cost.",
        "Freeze early, unfreeze as labels accumulate. Full fine-tuning on a few hundred examples overfits to a two-day snapshot of an empty store; unfreeze progressively as real labelled volume grows.",
        "mAP averages per-class AP , which itself summarizes the precision-recall trade-off — always inspect per-class AP separately, since a strong mean can hide a weak, safety-critical pedestrian class.",
        "For most real catalogues, backbone choice is a latency/data/infra decision , not an architecture-superiority question — a strong CNN and a strong ViT variant are often within noise of each other."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A detector scores three overlapping boxes on the same nearby vehicle: Box A (confidence 0.95), Box B (confidence 0.88, IoU with A = 0.72), Box C (confidence 0.60, IoU with A = 0.35, IoU with B = 0.55). Running greedy NMS with an IoU threshold of 0.5, which boxes survive?",
      "choices": [
        "Only A",
        "A and B",
        "A and C",
        "A, B, and C"
      ],
      "correct": 2,
      "explain": "A and C. NMS picks the top-scoring box A first and removes any remaining box whose IoU with A exceeds 0.5 — that's B (0.72 > 0.5), so B is discarded before C is ever compared to it. C's IoU with A is only 0.35, under threshold, so C survives and becomes the next kept box. Option D is wrong because it ignores that B gets suppressed by A in the very first step; C's IoU with B (0.55) is irrelevant to",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit4#lesson-2": [
    {
      "stem": "Fill the blank: It was also brutally slow: 2,000 independent forward passes of a full CNN, per image, meant _____ ran at roughly 47 seconds per frame on the hardware of the day.",
      "choices": [
        "R-CNN",
        "Focal loss",
        "convolution",
        "Test-time augmentation"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “R-CNN”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ , introduced with Mask R-CNN in 2017, removes the rounding entirely: it computes exact (fractional) coordinates and uses bilinear interpolation to sample feature values at those non-integer locations.",
      "choices": [
        "spectral index",
        "3D U-Net",
        "reverse process",
        "RoI Align"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “RoI Align”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Two-stage detectors: the R-CNN family\" teaches?",
      "choices": [
        "3D U-Net brings the encoder-decoder shape to true volumetric data , but full-volume 3-D convolution rarely fits in GPU memory, so patch-based processing with overlapping, blended patches is the standard workaround; SAM-style promp",
        "U-Net's skip connections concatenate high-resolution encoder features into the matching decoder stage, which is why U-Net (and its many descendants) remains the medical-imaging default — it recovers boundary precision that a bottl",
        "R-CNN (2014) ran a full CNN forward pass per region proposal (~2,000 per image) — accurate but ~47 seconds/frame, unusable for real-time perception.",
        "Synthetic data fills the long tail but should stay a minority share of any class's training examples to avoid overfitting to rendering artifacts."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Two-stage detectors: the R-CNN family\" teaches?",
      "choices": [
        "Fast R-CNN shares one backbone pass across all proposals and uses RoI pooling to extract a fixed-size feature slice per variable-size proposal, cutting inference to under two seconds per image.",
        "Data minimization and purpose limitation are design decisions, not policy afterthoughts: ephemeral raw video, persistent anonymized events only, and a hard human-escalation floor under every low-confidence automated decision.",
        "Whether to treat \"empty\" as a classification class or filter frames with an upstream detector is a real architectural decision , not a detail — it determines whether 80% of your data dominates the loss.",
        "Batching trades latency for throughput — bigger batches cut per-frame compute overhead but add queuing delay, so batch size is a tunable knob, not a default maximum."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Two-stage detectors: the R-CNN family\" teaches?",
      "choices": [
        "Backbone choice sets your data budget. A self-supervised, domain-pretrained backbone needs roughly a third to a half as many labels as an ImageNet backbone to hit equivalent shelf-recognition accuracy.",
        "Faster R-CNN's Region Proposal Network replaces external selective search with a learned, anchor-based, GPU-resident proposal step, making the whole detector end-to-end differentiable.",
        "Precision-recall for generative models separates realism from coverage , giving a way to name mode collapse (low recall) as distinct from poor sample quality (low precision) — FID alone conflates the two.",
        "Combined CE+Dice losses are the common production default, and rigorous evaluation reports a boundary metric (Hausdorff distance / HD95) alongside Dice, since Dice can mask a badly wrong boundary hidden inside a large, otherwise-c"
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Your perception team is choosing a detector for the primary 30+ FPS front-camera pipeline versus an offline tool for re-labeling a logged dataset with high-quality boxes for small, occluded objects. Which pairing makes sense?",
      "choices": [
        "Faster R-CNN for the real-time path, YOLO for offline re-labeling",
        "YOLO (or another one-stage detector) for the real-time path, Faster R-CNN for offline re-labeling",
        "Selective search alone for both, since it's simplest",
        "DETR for the real-time path, since transformers are always the modern choice"
      ],
      "correct": 1,
      "explain": "One-stage detectors trade some accuracy for the speed the 30+ FPS real-time budget demands; two-stage detectors like Faster R-CNN spend more latency but tend to do better on small and occluded objects, which is exactly what you want for careful offline dataset curation where latency doesn't matter. Option A has the pairing backwards — it would put the slower, more accurate detector where speed is ",
      "difficulty": "hard"
    },
    {
      "stem": "In Faster R-CNN, the component that replaced selective search by directly predicting object proposals from the shared backbone feature map is called the .",
      "choices": [
        "RoI pooling layer",
        "Region Proposal Network (RPN)",
        "Focal loss head",
        "Feature pyramid"
      ],
      "correct": 1,
      "explain": "Region Proposal Network (RPN). The RPN slides over the shared feature map using anchors to predict objectness and rough box coordinates directly, replacing the CPU-bound external selective-search algorithm and making the whole detector end-to-end trainable. RoI pooling (option A) is a downstream step that extracts a fixed-size feature slice for each proposal — it doesn't generate the proposals the",
      "difficulty": "hard"
    },
    {
      "stem": "Complete the missing line in this RoI-Align-style coordinate mapping, which converts a proposal box from image pixels to feature-map coordinates given the backbone's stride, without rounding.",
      "choices": [
        "fx_min, fy_min, fx_max, fy_max = round(x_min/stride), round(y_min/stride), round(x_max/stride), round(y_max/stride)",
        "fx_min, fy_min, fx_max, fy_max = x_min/stride, y_min/stride, x_max/stride, y_max/stride",
        "fx_min, fy_min, fx_max, fy_max = x_min*stride, y_min*stride, x_max*stride, y_max*stride",
        "fx_min, fy_min, fx_max, fy_max = int(x_min/stride), int(y_min/stride), int(x_max/stride), int(y_max/stride)"
      ],
      "correct": 1,
      "explain": "Converting image pixels to feature-map units means dividing by the stride, and RoI Align's entire point is to keep the result fractional (not rounded or truncated) so bilinear interpolation can sample at the exact non-integer location — critical for small objects where rounding could collapse a box to zero width or height. Options A and D both round or truncate to integers, which is exactly the ol",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit4#lesson-3": [
    {
      "stem": "Fill the blank: _____ (You Only Look Once, Redmon et al., 2016) answered yes by reframing detection as a direct regression problem.",
      "choices": [
        "position embedding",
        "YOLO",
        "blurry",
        "Non-maximum suppression (NMS)"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “YOLO”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Single Shot Detector, Liu et al., 2016) tackled the huge-truck-versus-tiny-sign scale problem head-on by attaching detection heads to several feature maps at different depths of the backbone, not just one.",
      "choices": [
        "Transfer learning",
        "SSD",
        "shifted window",
        "feature descriptor"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “SSD”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ , introduced with RetinaNet (Lin et al., 2017), fixes this by down-weighting the loss contribution of examples the model already classifies confidently, via a modulating factor:",
      "choices": [
        "mask head",
        "Harris detector",
        "Focal loss",
        "Test-time augmentation"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Focal loss”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Focal loss , introduced with _____ (Lin et al., 2017), fixes this by down-weighting the loss contribution of examples the model already classifies confidently, via a modulating factor:",
      "choices": [
        "Resampling",
        "Illumination invariance",
        "RetinaNet",
        "dynamic range"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “RetinaNet”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"One-stage detectors: YOLO, SSD, and the modern picture\" teaches?",
      "choices": [
        "One-stage detectors (YOLO, SSD, RetinaNet) predict boxes, objectness, and class in a single dense forward pass over a grid — no separate proposal network — trading some accuracy for the speed real-time perception requires.",
        "Dilated/atrous convolutions (DeepLab) grow the receptive field without downsampling at all, trading the recover-detail problem for a compute/memory cost per layer instead.",
        "ImageNet normalisation statistics are wrong for satellite data — compute your own per-channel mean and std from your actual training tiles, especially for bands (NIR, SWIR) ImageNet never had.",
        "Scale before you standardise : convert 12/16-bit digital numbers to a bounded range first, then apply z-score normalisation, not the other way around."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"One-stage detectors: YOLO, SSD, and the modern picture\" teaches?",
      "choices": [
        "FCN (2015) made the output a spatial map at every layer by replacing dense classification layers with 1×1 convolutions, establishing the encoder-decoder shape.",
        "Squeeze-and-excitation adds per-channel attention for a few thousand parameters, letting the network reweight which channels matter per image.",
        "SSD's multi-scale feature maps assign small objects to early, high-resolution layers and large objects to later, low-resolution layers, directly addressing the huge-truck-to-tiny-sign scale range.",
        "Semantic segmentation labels pixels by class only; instance segmentation additionally separates individual objects of the same class (two adjacent kidneys, several distinct lesions); panoptic segmentation unifies both, splitting \""
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A junior engineer wrote this focal-loss-inspired weighting function to down-weight easy background anchors, but during training the model's loss on hard, misclassified pedestrian anchors barely moves while easy anchors dominate exactly as before. Find and describe the bug.",
      "choices": [
        "The exponent should be 1, not gamma",
        "The function should return (1 - p_t) ** gamma , not p_t ** gamma",
        "The function needs a log() call that's missing",
        "The bug is in how p_t is computed upstream, not in this function"
      ],
      "correct": 1,
      "explain": "Focal loss's modulating factor is (1 - p_t)^γ , not p_t^γ — it needs to shrink toward zero as p_t grows toward 1 (an easy, confidently-correct example), and grow toward 1 as p_t shrinks (a hard, wrong example). The buggy version does the opposite: p_t ** gamma is large for easy examples (0.99² ≈ 0.98) and small for hard ones (0.2² = 0.04) — it amplifies exactly the easy background anchors focal lo",
      "difficulty": "hard"
    },
    {
      "stem": "SSD attaches detection heads to multiple feature maps at different depths of the backbone rather than just one, as YOLOv1 originally did. What problem does this specifically address?",
      "choices": [
        "The class-imbalance problem between background and object anchors",
        "The rounding error in mapping proposal coordinates onto a feature map",
        "The huge scale range between nearby, large objects and distant, small ones",
        "The slow, CPU-bound external proposal generation step"
      ],
      "correct": 2,
      "explain": "Early, high-resolution feature maps suit small objects (a distant sign); later, low-resolution feature maps with larger receptive fields suit large objects (a nearby truck). Predicting at only one scale forces an anchor-size compromise between these extremes; multi-scale heads give each object size a natural home. Option A describes what focal loss/RetinaNet addresses, not SSD's multi-scale heads ",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit5#lesson-1": [
    {
      "stem": "Fill the blank: _____ is the task of assigning a class label to every pixel (or, in a CT volume, every voxel) in an image: liver, kidney, tumor, or background.",
      "choices": [
        "mask head",
        "Semantic segmentation",
        "pointwise convolution",
        "NDWI"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Semantic segmentation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The most direct approach is _____ (sometimes loosely called \"deconvolution,\" though it doesn't invert convolution mathematically).",
      "choices": [
        "gradient",
        "transposed convolution",
        "Swin Transformer",
        "unsharp masking"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “transposed convolution”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Concatenating them lets the decoder combine \"what\" with \"where\" at every scale, which is precisely why a _____ can trace a liver tumor's ragged boundary rather than a blurry oval approximation of one.",
      "choices": [
        "Rotation invariance",
        "per-channel histogram",
        "Tversky loss",
        "U-Net"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “U-Net”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Semantic segmentation: dense per-pixel prediction\" teaches?",
      "choices": [
        "Synthetic training data can teach a classifier generator fingerprints instead of the real signal — a domain gap that inflates validation accuracy on synthetic-contaminated test sets while degrading real-world performance, catchabl",
        "CLIP has a bag-of-words weakness — compositional, attribute-order queries (\"black strap, tan body\" vs. the reverse) can embed nearly identically, a real risk for fine-grained attribute search.",
        "Classification CNNs deliberately destroy spatial resolution through pooling and strided convolution; segmentation needs a full-resolution output, so the architecture has to actively recover what was thrown away.",
        "A useful descriptor is illumination-, rotation-, and (often) scale-invariant by construction — built from local gradient orientation and relative contrast, anchored to the keypoint's own dominant direction and detection scale."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Semantic segmentation: dense per-pixel prediction\" teaches?",
      "choices": [
        "FCN (2015) made the output a spatial map at every layer by replacing dense classification layers with 1×1 convolutions, establishing the encoder-decoder shape.",
        "Synthetic data fills the long tail but should stay a minority share of any class's training examples to avoid overfitting to rendering artifacts.",
        "ImageNet normalisation statistics are wrong for satellite data — compute your own per-channel mean and std from your actual training tiles, especially for bands (NIR, SWIR) ImageNet never had.",
        "GAN failure modes have names because they have causes: mode collapse (generator exploits a narrow trick), non-convergence (no fixed point), vanishing gradients (an over-strong discriminator starves its own signal) — each has a mat"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Semantic segmentation: dense per-pixel prediction\" teaches?",
      "choices": [
        "Vegetation stress is often invisible in RGB but visible in the red/NIR contrast, because that's the physical mechanism (chlorophyll absorption vs. cell-structure scattering) the stress actually disrupts.",
        "Scale before you standardise : convert 12/16-bit digital numbers to a bounded range first, then apply z-score normalisation, not the other way around.",
        "Transposed convolution can upsample but risks checkerboard artifacts when kernel size and stride don't divide evenly; bilinear-upsample-then-convolve avoids this and is the safer default.",
        "Freeze early, unfreeze as labels accumulate. Full fine-tuning on a few hundred examples overfits to a two-day snapshot of an empty store; unfreeze progressively as real labelled volume grows."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A standard ResNet classification backbone, run on a 512×512 CT slice, produces a final feature map of 16×16. Why is this a problem specifically for segmentation and not for whole-image classification?",
      "choices": [
        "The 16×16 map has too many channels for a segmentation head to process efficiently.",
        "Classification only needs one global label, so the resolution loss doesn't matter; segmentation needs a decision at every one of the original 512×512 locations, and the f",
        "A 16×16 feature map cannot represent more than 256 distinct classes, which is insufficient for organ segmentation.",
        "ResNet backbones are incompatible with segmentation and must be replaced entirely with a different family of networks."
      ],
      "correct": 1,
      "explain": "Downsampling is a deliberate design choice for classification — it builds translation invariance and a compact global descriptor, which is all a single whole-image label needs. Segmentation needs to recover a full-resolution, pixel-accurate map, and the fine detail that pooling discarded (tumor edges, thin vessel walls) generally cannot be reconstructed from the compressed bottleneck alone, which ",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit5#lesson-2": [
    {
      "stem": "Fill the blank: This is _____ , and it is the central methodological problem of medical segmentation — far more so than in natural-image segmentation, where foreground objects (a person, a car) often occupy a substantial fraction of the frame.",
      "choices": [
        "reverse process",
        "class imbalance",
        "box filter",
        "IoU (Intersection over Union)"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “class imbalance”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ (also called the Sørensen–Dice index or F1 score in this context) measures the overlap between predicted mask P and ground-truth mask G directly:",
      "choices": [
        "tiling",
        "Rotation invariance",
        "Semantic segmentation",
        "Dice coefficient"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Dice coefficient”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Unit 4 introduced _____ , also called the Jaccard index, for scoring how well a predicted bounding box overlapped a ground-truth box: IoU = |P ∩ G| / |P ∪ G|.",
      "choices": [
        "Efficiency",
        "Mask R-CNN",
        "IoU (Intersection over Union)",
        "Swin Transformer"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “IoU (Intersection over Union)”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ generalizes Dice with two tunable weights, α and β, on false positives and false negatives respectively:",
      "choices": [
        "Semantic segmentation",
        "Horizontal flip",
        "CLIP",
        "Tversky loss"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Tversky loss”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Loss functions and metrics for imbalanced masks\" teaches?",
      "choices": [
        "Canny is a four-stage pipeline — smooth, gradient, non-max suppression, hysteresis threshold — not a single formula; skipping any stage degrades to raw thresholded Sobel with thick, noisy edges.",
        "Anchor-free detectors (CenterNet, FCOS) predict centers directly instead of refining hand-tuned anchor priors; DETR reframes detection as transformer-based set prediction, removing NMS entirely at a compute-latency cost.",
        "Pixel-wise cross-entropy and accuracy both fail silently on imbalanced masks — a model that predicts all-background can score 99%+ accuracy while being clinically useless.",
        "NMS greedily removes duplicate boxes by suppressing lower-scoring boxes that overlap a kept box past an IoU threshold."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A predicted tumor mask and a ground-truth tumor mask are being compared. Predicted mask area |P| = 400 voxels, ground-truth area |G| = 500 voxels, and the overlap |P ∩ G| = 300 voxels. What is the Dice coefficient?",
      "choices": [
        "0.60",
        "0.67",
        "0.75",
        "0.50"
      ],
      "correct": 1,
      "explain": "0.67. Dice = 2·|P∩G| / (|P| + |G|) = 2·300 / (400 + 500) = 600 / 900 ≈ 0.667. The formula divides by the sum of the two mask areas, not their union — that's what distinguishes it from IoU. 0.75 is the tempting distractor computed as |P∩G|/|P| = 300/400 — that's precision, not Dice, and it ignores that the ground-truth mask is a different size than the prediction. 0.60 is |P∩G|/|G| = 300/500 — that",
      "difficulty": "hard"
    },
    {
      "stem": "A radiotherapy planning team wants a segmentation model tuned so that it strongly prefers to avoid missing any part of a tumor (false negatives), even if that means slightly over-segmenting healthy tissue at the margin (more false positives). Which loss configuration best matches this goal?",
      "choices": [
        "Plain Dice loss, since it already balances precision and recall equally.",
        "Tversky loss with β (false-negative weight) set higher than α (false-positive weight).",
        "Tversky loss with α (false-positive weight) set higher than β (false-negative weight).",
        "Plain pixel-wise cross-entropy, since it treats every voxel identically regardless of class."
      ],
      "correct": 1,
      "explain": "Tversky loss's β term penalizes false negatives (|G − P|, ground truth not covered by the prediction); raising β relative to α makes the loss more costly whenever the model under-segments, pushing training toward higher recall — exactly the \"don't miss any tumor tissue\" preference described, at the acceptable cost of some extra false-positive margin. Distractor A is wrong because plain Dice (α = β",
      "difficulty": "hard"
    },
    {
      "stem": "A model achieves a Dice score of 0.93 on a kidney segmentation task, so the Hausdorff distance metric is redundant and doesn't need to be reported alongside it.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "False. Dice is a whole-region overlap measure averaged across the full mask volume; a large, mostly correct kidney segmentation can have one small but clinically important region — say, near a boundary adjacent to a tumor or vessel — that's badly wrong, and because that error is a small fraction of the kidney's total volume, it barely moves an overlap score like Dice. Hausdorff distance (or HD95) ",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit5#lesson-3": [
    {
      "stem": "Fill the blank: The first says \"these pixels are kidney\" and colors both kidneys the same shade — that's _____ : every pixel gets a class label, full stop, and it has no concept that there are two separate kidney objects rather than one oddly-shaped one.",
      "choices": [
        "semantic segmentation",
        "translation equivariance",
        "IoU (Intersection over Union)",
        "Class-weighted cross-entropy"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “semantic segmentation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: That's _____ : not just \"kidney,\" but \"kidney #1\" and \"kidney #2,\" distinguishable even though they're touching or nearly touching in the slice.",
      "choices": [
        "DeiT",
        "RoI Align",
        "instance segmentation",
        "Non-convergence"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “instance segmentation”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The dominant architecture for instance segmentation, _____ (He et al., 2017), builds directly on the two-stage detector from Unit 4: Faster R-CNN proposes candidate regions (RoIs) likely to contain an object, then classifies and refines the box for each.",
      "choices": [
        "Autoregressive models",
        "true positive",
        "channel-first",
        "Mask R-CNN"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “Mask R-CNN”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The dominant architecture for instance segmentation, Mask R-CNN (He et al., 2017), builds directly on the two-stage detector from Unit 4: _____ proposes candidate regions (RoIs) likely to contain an object, then classifies and refines the box for each.",
      "choices": [
        "Faster R-CNN",
        "class imbalance",
        "Test-time augmentation",
        "locality"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Faster R-CNN”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Instance and panoptic segmentation\" teaches?",
      "choices": [
        "DeiT closes ViT's data gap through distillation , not architecture — a distillation token learns from a pretrained CNN teacher, letting a ViT match CNN accuracy on ImageNet-1k alone.",
        "Semantic segmentation labels pixels by class only; instance segmentation additionally separates individual objects of the same class (two adjacent kidneys, several distinct lesions); panoptic segmentation unifies both, splitting \"",
        "NMS greedily removes duplicate boxes by suppressing lower-scoring boxes that overlap a kept box past an IoU threshold.",
        "Low-pass filters blur (remove high frequency = edges + noise together); high-pass filters sharpen or expose edges — a filter's behavior is readable straight off whether its weights average or difference neighboring pixels."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Instance and panoptic segmentation\" teaches?",
      "choices": [
        "Mask R-CNN extends Faster R-CNN (Unit 4) with a third, parallel mask head that predicts a small class-specific binary mask per RoI, decoupling shape prediction from classification.",
        "Dilated/atrous convolutions (DeepLab) grow the receptive field without downsampling at all, trading the recover-detail problem for a compute/memory cost per layer instead.",
        "Tversky loss generalizes Dice with separate false-positive/false-negative weights, letting you trade precision for recall when missing a lesion is costlier than over-segmenting it; focal Tversky additionally concentrates gradient ",
        "The forward process is fixed and un-learned — only the reverse denoising process is a trained network — and the closed-form shortcut x_t = √ᾱ_t·x₀ + √(1−ᾱ_t)·ε lets training sample any timestep directly."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Instance and panoptic segmentation\" teaches?",
      "choices": [
        "RoIAlign's bilinear-interpolated feature sampling (versus RoI pooling's coordinate rounding) was the specific fix that made per-pixel mask accuracy viable — rounding errors a box regressor tolerates are fatal to a mask.",
        "Sobel estimates directional derivatives with a built-in smoothing weight (1-2-1) , making it more noise-robust than the flat-weighted Prewitt operator, at the same 3×3 cost.",
        "Generative vs. discriminative is a distribution question: discriminative models learn p(y|x) , generative models learn (or learn to sample from) p(x) — a strictly harder target, which is why generative failures look like \"plausibl",
        "Cloud masking needs multiple signals , not a brightness threshold — bright snow, sand, and glint all fool naive rules that only look at one channel."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A CT slice shows two adjacent, touching enlarged lymph nodes that a radiologist needs individually measured for a treatment-response report. Which segmentation approach is required, and why does Mask R-CNN's RoIAlign matter for it?",
      "choices": [
        "Semantic segmentation is sufficient, since both nodes belong to the same \"lymph node\" class and don't need to be distinguished.",
        "Instance segmentation is required to separate the two touching nodes into individually measurable objects; RoIAlign matters because its bilinear-interpolated feature samp",
        "Instance segmentation is required, but RoIAlign is irrelevant to mask quality — it only affects bounding-box regression accuracy.",
        "Panoptic segmentation is strictly required, since any scene containing more than one object of the same class must be handled panoptically."
      ],
      "correct": 1,
      "explain": "Because the report needs each node's own individual measurement, a single merged \"lymph node\" region (what semantic segmentation alone would produce) loses exactly the information needed — it can't tell you there are two nodes, let alone measure them separately. Mask R-CNN's mask head predicts a mask per RoI, and RoIAlign's precise, non-rounded feature sampling is what keeps that per-RoI mask corr",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit6#lesson-1": [
    {
      "stem": "Fill the blank: The first is _____ : a 3×3 kernel only ever looks at a pixel's immediate neighbors, so the network assumes that nearby pixels are the ones worth relating to each other.",
      "choices": [
        "Focal Tversky loss",
        "CLIP",
        "Resampling",
        "locality"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “locality”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The second is _____ : the same kernel slides over the whole image, so a handbag's clasp is detected the same way whether it sits in the top-left corner of the frame or the bottom-right.",
      "choices": [
        "3D U-Net",
        "translation equivariance",
        "Focal loss",
        "pointwise convolution"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “translation equivariance”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: ViT slices an image into a grid of fixed-size, non-overlapping _____ — typically 16×16 pixels — and treats each patch exactly the way Course 2 treated a wordpiece: as one token in a sequence.",
      "choices": [
        "patches",
        "depthwise convolution",
        "Rotation invariance",
        "Cloud deployment"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “patches”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Each patch is flattened from a (16, 16, 3) block of pixels into a 768-length vector and passed through a single learned linear layer — the _____ — to produce the token's initial representation.",
      "choices": [
        "residual",
        "Bilinear",
        "generative model",
        "patch embedding"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “patch embedding”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"The Vision Transformer\" teaches?",
      "choices": [
        "Each architecture solved one specific blocker : AlexNet solved trainability at scale (ReLU, dropout, GPUs), VGG solved \"how do I add depth systematically\" (uniform 3×3 stacks), Inception solved fixed-receptive-field waste (multi-b",
        "Channel count and bit depth multiply directly into file size , which is why multiband satellite pipelines are architected around tiling rather than whole-scene loading.",
        "Global attention over patches is quadratic in token count — the same cost problem Course 2 flagged for long sequences, worsened by the fact that higher image resolution (needed for fine-grained distinctions) multiplies token count",
        "ViT trades hand-coded priors for learned ones. CNNs bake in locality and translation equivariance via the convolution operation; ViT has neither and must learn spatial structure from data, which is why it needs far more training i"
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"The Vision Transformer\" teaches?",
      "choices": [
        "Patchify is the only vision-specific step. A 16×16 patch becomes one token, flattened and linearly projected — the transformer encoder that follows is identical in kind to the one Course 2 used for text.",
        "Pixel-wise cross-entropy and accuracy both fail silently on imbalanced masks — a model that predicts all-background can score 99%+ accuracy while being clinically useless.",
        "Detection outputs a variable-length list of (class, box, score) triples per image — the core architectural challenge is making a fixed-size network emit an unbounded set.",
        "Fast R-CNN shares one backbone pass across all proposals and uses RoI pooling to extract a fixed-size feature slice per variable-size proposal, cutting inference to under two seconds per image."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A plain ViT-Base is fine-tuned on a boutique's catalogue of 8,000 product photos (no pretraining, trained from scratch) and underperforms a ResNet-50 trained from scratch on the same data. What is the most likely explanation?",
      "choices": [
        "ViT's [CLS] token cannot represent classification tasks as well as global average pooling.",
        "ViT has no convolutional inductive bias, so at this data scale it hasn't seen enough examples to learn locality and translation structure on its own, while the CNN gets t",
        "16×16 patches are too large to capture fine product detail.",
        "Self-attention cannot express translation equivariance in principle, at any data scale."
      ],
      "correct": 1,
      "explain": "This is exactly the JFT-300M lesson from Lesson 1: at small data scale (8,000 images is far below even ImageNet-1k), a from-scratch ViT underperforms a CNN because it must learn spatial priors the CNN has built in. This is a data-scale effect, not a fundamental limitation. D is the tempting-sounding but wrong distractor: self-attention absolutely can express translation-equivariant behavior given ",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit6#lesson-2": [
    {
      "stem": "Because Swin Transformer restricts self-attention to local windows, a single Swin layer has strictly less representational power than a plain ViT layer with full global attention, and Swin can never match ViT's accuracy on any task.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. A single Swin layer does have restricted attention, but shifted windows across successive layers let information propagate across the whole image over depth, and Swin's hierarchical downsampling additionally gives it multi-scale features ViT lacks. In practice Swin has matched or beaten plain ViT on many benchmarks, particularly detection and segmentation where the feature pyramid m",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The _____ (2021) solves the cost problem by giving up global attention within a layer and instead computing self-attention inside small, fixed-size local windows — typically 7×7 patches.",
      "choices": [
        "channel-first",
        "Swin Transformer",
        "cross-correlation",
        "high-pass filter"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Swin Transformer”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: Swin's fix is the _____ : alternating layers offset the window grid by half a window's width, so patches that were split into two separate windows in one layer end up sharing a window in the next.",
      "choices": [
        "Transfer learning",
        "Mask R-CNN",
        "shifted window",
        "mask head"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “shifted window”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Data-efficient image Transformer, 2021) attacks the data-hunger problem from Lesson 1 directly, without touching the architecture.",
      "choices": [
        "patch embedding",
        "DeiT",
        "knowledge distillation",
        "class imbalance"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “DeiT”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Making ViTs practical: hierarchical and efficient variants\" teaches?",
      "choices": [
        "The forward process is fixed and un-learned — only the reverse denoising process is a trained network — and the closed-form shortcut x_t = √ᾱ_t·x₀ + √(1−ᾱ_t)·ε lets training sample any timestep directly.",
        "Scale before you standardise : convert 12/16-bit digital numbers to a bounded range first, then apply z-score normalisation, not the other way around.",
        "Global attention over patches is quadratic in token count — the same cost problem Course 2 flagged for long sequences, worsened by the fact that higher image resolution (needed for fine-grained distinctions) multiplies token count",
        "Precision-recall for generative models separates realism from coverage , giving a way to name mode collapse (low recall) as distinct from poor sample quality (low precision) — FID alone conflates the two."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Making ViTs practical: hierarchical and efficient variants\" teaches?",
      "choices": [
        "Faster R-CNN's Region Proposal Network replaces external selective search with a learned, anchor-based, GPU-resident proposal step, making the whole detector end-to-end differentiable.",
        "SSD's multi-scale feature maps assign small objects to early, high-resolution layers and large objects to later, low-resolution layers, directly addressing the huge-truck-to-tiny-sign scale range.",
        "Swin trades global attention for local-window attention plus a hierarchy , restoring linear cost and a multi-scale feature pyramid that detection and segmentation heads expect; shifted windows let information cross window boundari",
        "Video is temporal, not a pile of independent frames; tracking across frames lets a cheaper model reach reliability a bigger single-frame model would need brute force to match."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Complete the shifted-window helper so that a (H, W, C) grid of patch tokens is partitioned into non-overlapping local windows for windowed self-attention. Fill in the blank so the reshape correctly groups tokens by window rather than by row.",
      "choices": [
        "reshape(-1, C)",
        "transpose(0, 2, 1, 3, 4)",
        "flatten()",
        "transpose(1, 0, 3, 2, 4)"
      ],
      "correct": 1,
      "explain": "After the initial reshape the axes are (window_row, in_window_row, window_col, in_window_col, C). To group all tokens belonging to the same window together before flattening, window_row and window_col need to be adjacent, so window_col (axis 2) must move next to window_row (axis 0) — giving (window_row, window_col, in_window_row, in_window_col, C), which is what transpose(0, 2, 1, 3, 4) produces. ",
      "difficulty": "hard"
    },
    {
      "stem": "A team benchmarks ConvNeXt against Swin Transformer on their product-category classification task, both trained with the same modern recipe (AdamW, strong augmentation, long schedule), and finds accuracy within 0.3% of each other. What is the best conclusion to draw?",
      "choices": [
        "The benchmark must be flawed, since transformers are architecturally superior to CNNs for vision.",
        "This matches the broader finding that a large share of ViT-family gains over older CNNs came from modernized training recipes rather than attention itself — once recipes ",
        "ConvNeXt must be internally using self-attention, which is why it matches Swin.",
        "The result is only possible because the catalogue is unusually small; at scale Swin would pull ahead."
      ],
      "correct": 1,
      "explain": "This is exactly the ConvNeXt rebuttal from Lesson 2: it's a pure CNN with modernized training and design details, and it matches transformer backbones at comparable scale, showing recipe mattered more than the presence of attention. C is the tempting-but-wrong distractor: ConvNeXt is explicitly attention-free — its improvements come from things like larger depthwise kernels, GELU, fewer normalizat",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit6#lesson-3": [
    {
      "stem": "Fill the blank: Then came _____ : MAE (2021) adapted BERT's mask-and-predict pretraining (Course 2 Unit 4) to pixels.",
      "choices": [
        "residual",
        "Cloud deployment",
        "Non-maximum suppression (NMS)",
        "masked image modeling"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “masked image modeling”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: And in 2021, _____ united the vision and language sides entirely, training on image-text pairs scraped from the web rather than any hand-labeled category taxonomy — which is the piece that makes \"find products like this photo\" possible at all.",
      "choices": [
        "CLIP",
        "true positive",
        "kernel",
        "dynamic range"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “CLIP”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ (Masked Autoencoders) applies BERT's masked-token prediction idea to images: mask out a large fraction of image patches, encode only the visible ones, and train a lightweight decoder to reconstruct the missing patches' raw pixels.",
      "choices": [
        "channel-last",
        "Harris detector",
        "8-bit depth",
        "MAE"
      ],
      "correct": 3,
      "explain": "The lesson introduces this as “MAE”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Self-supervised and multimodal vision\" teaches?",
      "choices": [
        "Huge georeferenced scenes must be tiled with overlap , not cut into abutting patches, or predictions near patch borders lose context and degrade at the seams.",
        "Mask R-CNN extends Faster R-CNN (Unit 4) with a third, parallel mask head that predicts a small class-specific binary mask per RoI, decoupling shape prediction from classification.",
        "Contrastive SSL (SimCLR, MoCo) turns augmentation into a label , using the InfoNCE loss from Course 2 to pull together two views of one image and push apart different images — useful directly for building a visual-similarity retri",
        "Edge is forced, not chosen for its own sake: bandwidth limits, sub-second latency requirements, and minimizing raw video leaving the premises all point the same direction — detect locally, ship only derived events to the cloud."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Self-supervised and multimodal vision\" teaches?",
      "choices": [
        "SIFT's 128-d descriptor (4×4 cells × 8 orientation bins) is thorough but costly ; ORB trades float descriptors and Euclidean distance for binary strings and Hamming distance to run at video rate on a CPU.",
        "EfficientNet scales depth, width, and resolution together under one compound coefficient rather than tuning one dimension at a time.",
        "Gaussian beats box smoothing because it has no hard cutoff (no ringing/false edges), is rotationally symmetric, and — unlike most smoothing shapes — is separable.",
        "MAE reconstructs masked patches like BERT reconstructs masked tokens , but needs a far higher mask ratio (about 75% vs. BERT's 15%) because images are spatially redundant and a low mask ratio lets the model cheat by local interpol"
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "An engineer implements MAE-style pretraining for a catalogue-image encoder but sets the mask ratio to 15%, copying the value directly from a BERT config, reasoning \"it's the same mask-and-reconstruct idea, so the same ratio should transfer.\" Training loss drops quickly and the model reconstructs images near-perfectly, but the encoder perf",
      "choices": [
        "The loss function is wrong; MAE should use cross-entropy, not MSE, on pixel values.",
        "The mask ratio is far too low for images; at 15% masking, most patches are trivially recoverable from unmasked neighbors by local interpolation, so the encoder learns to ",
        "The decoder should be as large as the encoder, matching BERT's symmetric architecture.",
        "Nothing is wrong; low reconstruction loss confirms the encoder learned good representations."
      ],
      "correct": 1,
      "explain": "Images are spatially redundant in a way text isn't — a masked patch is usually predictable from its immediate unmasked neighbors. A 15% mask ratio, appropriate for BERT's information-dense text tokens, is far too easy for images and lets the model reconstruct via simple interpolation without learning global structure. MAE uses roughly 75% masking specifically to remove that shortcut. D is the trap",
      "difficulty": "hard"
    },
    {
      "stem": "A marketplace wants shoppers to type a text query like \"quilted black shoulder bag with chain strap\" and retrieve matching product photos. Which architecture directly enables this without any labeled category taxonomy?",
      "choices": [
        "A Swin Transformer classifier fine-tuned on a fixed set of product categories.",
        "A SimCLR-pretrained image encoder used alone.",
        "CLIP, whose contrastively-trained dual encoders place images and text in one shared embedding space, so a text query embeds into the same space as catalogue image embeddi",
        "An MAE-pretrained encoder, since its decoder can generate text captions from images."
      ],
      "correct": 2,
      "explain": "Text-to-image retrieval requires text and images to live in one comparable embedding space — that's exactly what CLIP's image-text contrastive training produces, letting a text query's embedding be compared by cosine similarity against precomputed catalogue image embeddings. B is the tempting distractor: SimCLR produces a strong image-only embedding space (useful for image-to-image similarity), bu",
      "difficulty": "hard"
    },
    {
      "stem": "A CLIP-based zero-shot classifier, trained mostly on clean web-scraped studio-style product photos, is deployed to auto-tag photos that sellers upload from their phones. Accuracy is noticeably lower on the phone uploads than in the studio-photo benchmark that was used to select the model. Separately, the model also confuses \"a tan bag wit",
      "choices": [
        "Both failures stem from the same root cause: too few training epochs.",
        "The accuracy drop on phone photos is distribution shift (studio-vs-user-photo gap); the color/attribute confusion is CLIP's separate bag-of-words weakness, where composit",
        "Both are caused by the mask ratio being set too low during pretraining.",
        "Both would be fixed by switching from a ViT image encoder to a Swin image encoder inside CLIP."
      ],
      "correct": 1,
      "explain": "These are two independent, well-known CLIP limitations from Lesson 3: distribution shift (a model whose training skewed toward clean studio images degrades on cluttered, differently-lit user photos) and the bag-of-words weakness (contrastive training rewards overall gist-matching, not compositional/attribute-order structure). Diagnosing them as one root cause would send the team looking for a sing",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit7#lesson-1": [
    {
      "stem": "Because a VAE's decoder is trained with a pixel-wise reconstruction loss, VAE samples are typically blurrier than GAN or diffusion samples at comparable resolution.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 0,
      "explain": "Answer: True. Minimizing a pixel-wise loss like MSE rewards predicting the average of multiple plausible outputs when the model is uncertain, which systematically smooths away fine texture and sharp edges — this is a direct, structural consequence of the objective, not an incidental training artifact that better hyperparameters would fix.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A _____ answers a narrower question than people give it credit for.",
      "choices": [
        "channel-first",
        "Focal Tversky loss",
        "discriminative model",
        "CLIP"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “discriminative model”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: A _____ is answering the harder, symmetric question: it estimates p(x) , the distribution the images themselves were drawn from, well enough to draw new samples from it.",
      "choices": [
        "transposed convolution",
        "generative model",
        "Bicubic",
        "channels"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “generative model”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: The catch is well known: VAE samples are characteristically _____ .",
      "choices": [
        "blurry",
        "patch embedding",
        "Tversky loss",
        "masked image modeling"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “blurry”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Generative modelling and GANs\" teaches?",
      "choices": [
        "Dice loss (1 minus the differentiable Dice coefficient) is normalized by mask size rather than total voxel count, so the rare class keeps a meaningful gradient throughout training.",
        "Swin trades global attention for local-window attention plus a hierarchy , restoring linear cost and a multi-scale feature pyramid that detection and segmentation heads expect; shifted windows let information cross window boundari",
        "Generative vs. discriminative is a distribution question: discriminative models learn p(y|x) , generative models learn (or learn to sample from) p(x) — a strictly harder target, which is why generative failures look like \"plausibl",
        "CLIP has a bag-of-words weakness — compositional, attribute-order queries (\"black strap, tan body\" vs. the reverse) can embed nearly identically, a real risk for fine-grained attribute search."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Generative modelling and GANs\" teaches?",
      "choices": [
        "Normalisation leakage happens when statistics are computed across train and test data together — always split first, then compute stats only from the training partition.",
        "VAEs trade sharpness for a well-behaved latent space via the reconstruction+KL objective; their blur is a direct consequence of pixel-wise reconstruction loss, not a fixable bug.",
        "Difference of Gaussians across a scale pyramid finds a blob's position and size together , the same scale-space idea SIFT reuses for scale-invariant keypoints in Lesson 3.",
        "FID and Inception Score are widely reported and widely flawed — a Gaussian approximation, sensitivity to the scoring network, and no ability to detect generator-fingerprint learning — so treat them as one signal, not a verdict."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Generative modelling and GANs\" teaches?",
      "choices": [
        "Spectral indices are normalized differences between two bands chosen because a target material responds to them with opposite sign or magnitude — NDVI (red/NIR) for vegetation, NDWI (green/NIR) for water.",
        "Multispectral means more than RGB — Sentinel-2's 13 bands extend into near-infrared and shortwave infrared, wavelengths invisible to the eye but diagnostic for vegetation, water, and soil.",
        "GAN failure modes have names because they have causes: mode collapse (generator exploits a narrow trick), non-convergence (no fixed point), vanishing gradients (an over-strong discriminator starves its own signal) — each has a mat",
        "Low-pass filters blur (remove high frequency = edges + noise together); high-pass filters sharpen or expose edges — a filter's behavior is readable straight off whether its weights average or difference neighboring pixels."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A team training a GAN to generate synthetic weld-defect images notices that after epoch 40, every generated \"porosity\" defect looks almost pixel-identical — same size, same position, same shape. Discriminator and generator losses both look numerically stable. What is this, and what's the most direct fix?",
      "choices": [
        "Vanishing gradients; lower the discriminator's learning rate.",
        "Mode collapse; add a diversity-encouraging term (e.g. minibatch discrimination) or switch to a loss less prone to it, like WGAN-GP.",
        "Non-convergence; the losses oscillating means training hasn't started yet, so just train longer.",
        "Overfitting; add dropout to the generator."
      ],
      "correct": 1,
      "explain": "A generator collapsing to near-identical outputs while losses stay numerically stable is the textbook signature of mode collapse — the generator found a narrow trick that reliably fools the current discriminator and stopped exploring. WGAN-GP's smoother loss landscape and explicit diversity-encouraging techniques are the standard countermeasures. Vanishing gradients (A) present as the generator fa",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit7#lesson-2": [
    {
      "stem": "Fill the blank: The generative half is the _____ : a neural network learns to undo one small noising step at a time, starting from pure noise at t=T and working down to t=0 .",
      "choices": [
        "RoI Align",
        "reverse process",
        "generative model",
        "linear filter"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “reverse process”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Diffusion models\" teaches?",
      "choices": [
        "The forward process is fixed and un-learned — only the reverse denoising process is a trained network — and the closed-form shortcut x_t = √ᾱ_t·x₀ + √(1−ᾱ_t)·ε lets training sample any timestep directly.",
        "Fast R-CNN shares one backbone pass across all proposals and uses RoI pooling to extract a fixed-size feature slice per variable-size proposal, cutting inference to under two seconds per image.",
        "Closing the one-stage/two-stage accuracy gap does not remove the need for redundancy — multi-camera coverage, sensor fusion, and temporal tracking — in a safety-critical stack.",
        "Global attention over patches is quadratic in token count — the same cost problem Course 2 flagged for long sequences, worsened by the fact that higher image resolution (needed for fine-grained distinctions) multiplies token count"
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Diffusion models\" teaches?",
      "choices": [
        "Dice loss (1 minus the differentiable Dice coefficient) is normalized by mask size rather than total voxel count, so the rare class keeps a meaningful gradient throughout training.",
        "Epsilon-prediction plus plain MSE is the whole training objective; it works because predicting zero-mean noise is a better-conditioned regression target than predicting a raw image whose statistics vary with t .",
        "Images are (H, W, C) tensors , and the channel axis position (last for most libraries, first for PyTorch) is a convention you must match to whatever code consumes the array.",
        "Proposal-based (Mask R-CNN) vs. proposal-free (cluster dense embeddings) instance segmentation trade mature detection machinery against better handling of crowded, non-box-shaped, or heavily overlapping instances."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Diffusion models\" teaches?",
      "choices": [
        "Contrastive SSL (SimCLR, MoCo) turns augmentation into a label , using the InfoNCE loss from Course 2 to pull together two views of one image and push apart different images — useful directly for building a visual-similarity retri",
        "The U-Net backbone is unchanged from Unit 5 except for timestep conditioning injected into every block — the same coarse+fine fusion that served segmentation now serves denoising.",
        "MAE reconstructs masked patches like BERT reconstructs masked tokens , but needs a far higher mask ratio (about 75% vs. BERT's 15%) because images are spatially redundant and a low mask ratio lets the model cheat by local interpol",
        "ImageNet normalisation statistics are wrong for satellite data — compute your own per-channel mean and std from your actual training tiles, especially for bands (NIR, SWIR) ImageNet never had."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Diffusion models\" teaches?",
      "choices": [
        "Mask R-CNN extends Faster R-CNN (Unit 4) with a third, parallel mask head that predicts a small class-specific binary mask per RoI, decoupling shape prediction from classification.",
        "Backbone choice sets your data budget. A self-supervised, domain-pretrained backbone needs roughly a third to a half as many labels as an ImageNet backbone to hit equivalent shelf-recognition accuracy.",
        "DDIM's non-Markovian reformulation buys a 20-50x sampling speedup over DDPM by skipping steps, but diffusion is still far slower per image than a GAN's single forward pass — a real deployment cost, not a footnote.",
        "EfficientNet scales depth, width, and resolution together under one compound coefficient rather than tuning one dimension at a time."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Diffusion models\" teaches?",
      "choices": [
        "Patchify is the only vision-specific step. A 16×16 patch becomes one token, flattened and linearly projected — the transformer encoder that follows is identical in kind to the one Course 2 used for text.",
        "IoU is intersection area over union area; it is the yardstick for \"is this predicted box a match\" at a chosen threshold (commonly 0.5).",
        "Decouple embeddings from classification so new SKUs are index insertions, not full retrains — reserve full retraining for scheduled cadence, not every catalogue tweak.",
        "Latent diffusion moves the entire denoising loop into a compressed VAE latent space , which is the difference between \"runs on a data-center cluster\" and \"runs on a single consumer GPU.\""
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A product team wants to swap a diffusion pipeline from DDPM sampling with 1,000 steps to DDIM sampling with 40 steps for a faster interactive preview. What should they expect?",
      "choices": [
        "Identical sample quality with a 25x speedup, since DDIM is mathematically equivalent to DDPM at any step count.",
        "A speedup, with quality close to (though not always exactly matching) the full-step DDPM result, because DDIM's non-Markovian reformulation permits skipping steps.",
        "No speedup, because the U-Net still has to process the full image at every one of the 1,000 original noise levels regardless of sampler.",
        "A speedup only if they also switch to a GAN, since diffusion samplers cannot be accelerated below 1,000 steps."
      ],
      "correct": 1,
      "explain": "DDIM's reformulation of the reverse process as non-Markovian is precisely what allows it to skip intermediate steps while approximating the same trajectory, typically getting most of DDPM's quality in a fraction of the steps — but \"approximating\" is the operative word; it is not mathematically identical output. A overstates the guarantee — DDIM is an approximation, not an equivalence, and quality ",
      "difficulty": "hard"
    },
    {
      "stem": "A junior engineer wrote this classifier-free guidance step, but samples come out barely responsive to the prompt no matter how high they set w . Find the bug.",
      "choices": [
        "The guidance weight w should be a value less than 1, not greater.",
        "The unconditional pass is called with cond=cond_emb instead of cond=None , so eps_cond and eps_uncond are identical and the guidance term collapses to zero regardless of ",
        "The two U-Net calls should share one forward pass to save compute.",
        "The extrapolation direction is reversed — it should be eps_cond - w*(eps_cond - eps_uncond) ."
      ],
      "correct": 1,
      "explain": "Both lines call the U-Net with the identical conditioning embedding, so eps_cond - eps_uncond is exactly zero every time, no matter what w is — the model is silently only ever seeing eps_uncond (which happens to equal eps_cond here), which matches the reported symptom of prompt-blindness at any guidance strength. The unconditional call needs cond=None to actually train the divergence between the t",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit7#lesson-3": [
    {
      "stem": "FID and Inception Score, computed correctly, are sufficient on their own to certify that a set of generated images will actually improve a downstream classifier's real-world performance.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. Both metrics assess how statistically close generated images look to real ones in a pretrained feature space (or how confidently/diversely an Inception classifier labels them) — neither one evaluates whether a downstream task actually improves, and neither can detect a classifier learning generator fingerprints instead of genuine signal. They're diagnostics that correlate loosely wi",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ masks out a region of an existing image and runs the diffusion process only on the masked pixels, conditioned on the surrounding unmasked context, so you can swap a background while leaving the product untouched.",
      "choices": [
        "Inpainting",
        "Transfer learning",
        "high-pass filter",
        "kernel"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Inpainting”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ starts the reverse process not from pure noise but from a partially-noised version of a real reference image, so the output stays structurally anchored to that reference while still being subject to the text conditioning.",
      "choices": [
        "img2img",
        "Intersection over Union (IoU)",
        "ReLU",
        "Focal loss"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “img2img”.",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ instead looks only at generated images, rewarding samples that an Inception classifier labels confidently (sharp, recognizable) and that are diverse across classes as a batch.",
      "choices": [
        "Generative adversarial networks",
        "Inception Score",
        "Transfer learning",
        "RoIAlign"
      ],
      "correct": 1,
      "explain": "The lesson introduces this as “Inception Score”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Conditioning, control, and the honest limits\" teaches?",
      "choices": [
        "Huge georeferenced scenes must be tiled with overlap , not cut into abutting patches, or predictions near patch borders lose context and degrade at the seams.",
        "Cross-attention conditions on open-ended text; ControlNet/inpainting/img2img condition on pixel-precise structure — text alone can't specify an exact product silhouette, which is why production pipelines stack these techniques rat",
        "Transfer learning works across the ImageNet-to-camera-trap gap because early convolutional layers learn domain-general edges and textures; only later layers need to adapt.",
        "Difference of Gaussians across a scale pyramid finds a blob's position and size together , the same scale-space idea SIFT reuses for scale-invariant keypoints in Lesson 3."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Conditioning, control, and the honest limits\" teaches?",
      "choices": [
        "Dense prediction creates severe class imbalance (background anchors vastly outnumber object anchors); focal loss down-weights easy examples so hard, rare object anchors dominate the gradient.",
        "Synthetic training data can teach a classifier generator fingerprints instead of the real signal — a domain gap that inflates validation accuracy on synthetic-contaminated test sets while degrading real-world performance, catchabl",
        "IoU/Jaccard from Unit 4 applies unchanged to masks ; Dice and IoU are monotonically related and usually reported together in medical segmentation papers.",
        "Horizontal flip is safe augmentation for wildlife; vertical flip is not — gravity orients real animals, so an upside-down training image teaches an impossible prior."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A hospital-imaging team generates synthetic X-rays of a rare fracture pattern with a fine-tuned diffusion model to augment a scarce real dataset. After adding the synthetic images, their held-out test accuracy (drawn from the same synthetic pipeline) jumps from 81% to 97%. What should this jump make them suspicious of?",
      "choices": [
        "Nothing — a 16-point jump confirms the augmentation worked and the classifier is ready to deploy.",
        "That the FID score of the generator must have been poor, since FID would have caught this.",
        "That the classifier may have learned to key off generator-specific artifacts shared between the synthetic training and synthetic test images, rather than the real fractur",
        "That classifier-free guidance was set too low during generation."
      ],
      "correct": 2,
      "explain": "A large accuracy jump on a test set that itself contains synthetic images is exactly the domain-gap trap: the classifier can be rewarded for detecting shared generator fingerprints rather than the true physical signature, and this failure is invisible until validated against real images the generator never touched. A ignores the specific risk named in the lesson — a suspicious jump warrants scruti",
      "difficulty": "hard"
    },
    {
      "stem": "Complete the missing line in this ControlNet-style sketch so the auxiliary structural signal (an edge map) actually influences the frozen base U-Net's output, per the mechanism described in Lesson 3.",
      "choices": [
        "base_features (ignore control_features entirely)",
        "base_features + control_features",
        "control_features (ignore base_features entirely)",
        "torch.cat([base_features, control_features], dim=0) (stack along the batch dimension)"
      ],
      "correct": 1,
      "explain": "ControlNet's trainable branch is injected into the frozen base model's activations additively (the original paper zero-initializes the injection so it starts as a no-op and gradually learns useful contributions), so the base network's learned image priors and the auxiliary structural signal both influence the decoder. A discards the entire point of ControlNet — without adding control_features in, ",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit8#lesson-1": [
    {
      "stem": "With only a few hundred labelled examples per new SKU, fully fine-tuning every layer of the backbone is the safest way to adapt it to the new store's shelf images.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. With only a few hundred examples per class, full fine-tuning tends to overfit to the specifics of that small sample — the exact lighting and angle of a two-day empty-store capture, for instance — and can collapse once real, more varied shopper traffic arrives. Freezing the backbone and training only a lightweight head, then progressively unfreezing as labelled volume grows, is the s",
      "difficulty": "easy"
    },
    {
      "stem": "Fill the blank: _____ means initializing a network with weights learned on one task and adapting it to another, and the choice of source matters more than any hyperparameter you will tune afterward.",
      "choices": [
        "Transfer learning",
        "discriminator",
        "true positive",
        "8-bit depth"
      ],
      "correct": 0,
      "explain": "The lesson introduces this as “Transfer learning”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Transfer learning and data strategy in production vision\" teaches?",
      "choices": [
        "RoI Align removes RoI pooling's coordinate-rounding error via bilinear interpolation — the fix that matters most for small, distant objects like traffic signs.",
        "Mask R-CNN extends Faster R-CNN (Unit 4) with a third, parallel mask head that predicts a small class-specific binary mask per RoI, decoupling shape prediction from classification.",
        "Contrastive SSL (SimCLR, MoCo) turns augmentation into a label , using the InfoNCE loss from Course 2 to pull together two views of one image and push apart different images — useful directly for building a visual-similarity retri",
        "Backbone choice sets your data budget. A self-supervised, domain-pretrained backbone needs roughly a third to a half as many labels as an ImageNet backbone to hit equivalent shelf-recognition accuracy."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Transfer learning and data strategy in production vision\" teaches?",
      "choices": [
        "Each architecture solved one specific blocker : AlexNet solved trainability at scale (ReLU, dropout, GPUs), VGG solved \"how do I add depth systematically\" (uniform 3×3 stacks), Inception solved fixed-receptive-field waste (multi-b",
        "Freeze early, unfreeze as labels accumulate. Full fine-tuning on a few hundred examples overfits to a two-day snapshot of an empty store; unfreeze progressively as real labelled volume grows.",
        "RANSAC finds the geometric transform with the most agreeing matches , simultaneously rejecting bad correspondences and recovering the alignment needed before a meaningful pixel-level defect comparison.",
        "Convolution and correlation differ only by a 180° kernel flip , and are identical for the symmetric kernels — box, Gaussian, Laplacian — that dominate classical filtering."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Transfer learning and data strategy in production vision\" teaches?",
      "choices": [
        "IoU/Jaccard from Unit 4 applies unchanged to masks ; Dice and IoU are monotonically related and usually reported together in medical segmentation papers.",
        "Drift is physical in this domain — a re-lit aisle or a redesigned package silently shifts the input distribution — so monitor confidence and input statistics continuously, not accuracy on a stale validation set.",
        "Spatial resolution (meters/pixel) sets a hard ceiling on detectability — 10 m Sentinel-2 pixels can separate a field from a forest but not one tree from another.",
        "Active learning spends human labelling time on the frames that move the model — highest-uncertainty crops, not random sampling — and always folds labels back through human confirmation, never silent self-labelling."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Transfer learning and data strategy in production vision\" teaches?",
      "choices": [
        "A residual block learns F(x), not H(x) — reformulating the target as a correction to identity makes near-identity mappings trivially reachable.",
        "One-stage detectors (YOLO, SSD, RetinaNet) predict boxes, objectness, and class in a single dense forward pass over a grid — no separate proposal network — trading some accuracy for the speed real-time perception requires.",
        "Squeeze-and-excitation adds per-channel attention for a few thousand parameters, letting the network reweight which channels matter per image.",
        "Synthetic data fills the long tail but should stay a minority share of any class's training examples to avoid overfitting to rendering artifacts."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Transfer learning and data strategy in production vision\" teaches?",
      "choices": [
        "Decouple embeddings from classification so new SKUs are index insertions, not full retrains — reserve full retraining for scheduled cadence, not every catalogue tweak.",
        "Class weighting, resampling, and focal loss all attack imbalance from different angles and combine rather than substitute for each other.",
        "Dice loss (1 minus the differentiable Dice coefficient) is normalized by mask size rather than total voxel count, so the rare class keeps a meaningful gradient throughout training.",
        "These four architectures form a rough timeline of what each backbone in a modern classifier still borrows from: Inception's bottlenecks and ResNet's skip connections both survive into the efficient designs of Lesson 2."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "A new store format launches with almost no labelled shelf images. Which backbone choice typically requires the fewest labelled examples to reach a given shelf-recognition accuracy?",
      "choices": [
        "A randomly initialized network trained from scratch on the new store's footage only",
        "An ImageNet-pretrained backbone, fully fine-tuned from the first day",
        "A self-supervised backbone pretrained on the company's own unlabelled retail images from other stores",
        "A backbone pretrained purely on synthetic renders of the product catalogue"
      ],
      "correct": 2,
      "explain": "A self-supervised backbone pretrained on unlabelled images from the same domain (retail shelves, not natural photos) has already learned relevant features — packaging texture, occlusion, shelf clutter — before seeing a single label, cutting the labelled-data requirement roughly in half to a third compared to a generic ImageNet backbone. ImageNet pretraining (B) still helps over training from scrat",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit8#lesson-2": [
    {
      "stem": "Fill the blank: _____ means the inverse: centralized, elastic compute that trades a network round trip for far more capacity per model.",
      "choices": [
        "feature descriptor",
        "per-channel histogram",
        "Cloud deployment",
        "pixel"
      ],
      "correct": 2,
      "explain": "The lesson introduces this as “Cloud deployment”.",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"Deployment: edge, cloud, latency, and optimization\" teaches?",
      "choices": [
        "Horizontal flip is safe augmentation for wildlife; vertical flip is not — gravity orients real animals, so an upside-down training image teaches an impossible prior.",
        "StyleGAN's disentangled per-resolution latent injection is what makes \"same layout, different texture\" controllable generation possible — a capability plain GANs don't offer.",
        "Scale before you standardise : convert 12/16-bit digital numbers to a bounded range first, then apply z-score normalisation, not the other way around.",
        "Edge is forced, not chosen for its own sake: bandwidth limits, sub-second latency requirements, and minimizing raw video leaving the premises all point the same direction — detect locally, ship only derived events to the cloud."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Deployment: edge, cloud, latency, and optimization\" teaches?",
      "choices": [
        "Quantization, pruning, and distillation compound — distill to a smaller architecture, structurally prune it, then quantize to INT8 — each attacking size and speed from a different angle.",
        "Contrastive SSL (SimCLR, MoCo) turns augmentation into a label , using the InfoNCE loss from Course 2 to pull together two views of one image and push apart different images — useful directly for building a visual-similarity retri",
        "Fairness has to be measured per-subgroup , not just in aggregate — detection and re-identification error rates can and do diverge across demographics, and averaged metrics hide exactly that divergence.",
        "Dice loss (1 minus the differentiable Dice coefficient) is normalized by mask size rather than total voxel count, so the rare class keeps a meaningful gradient throughout training."
      ],
      "correct": 0,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Deployment: edge, cloud, latency, and optimization\" teaches?",
      "choices": [
        "Vegetation stress is often invisible in RGB but visible in the red/NIR contrast, because that's the physical mechanism (chlorophyll absorption vs. cell-structure scattering) the stress actually disrupts.",
        "Classical descriptors still win in controlled QA settings — no GPU, no training data, fully explainable failures — even though learned features have overtaken them for open-world recognition.",
        "RGB entangles brightness, hue, and saturation ; HSV and Lab untangle them for different purposes — HSV for hue/brightness-based masking, Lab for perceptual color matching.",
        "Video is temporal, not a pile of independent frames; tracking across frames lets a cheaper model reach reliability a bigger single-frame model would need brute force to match."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Deployment: edge, cloud, latency, and optimization\" teaches?",
      "choices": [
        "Data minimization and purpose limitation are design decisions, not policy afterthoughts: ephemeral raw video, persistent anonymized events only, and a hard human-escalation floor under every low-confidence automated decision.",
        "Two-stage detectors trade real-time speed for accuracy, particularly on small/occluded objects — a defensible choice offline, usually not for a 30+ FPS front-camera path.",
        "Batching trades latency for throughput — bigger batches cut per-frame compute overhead but add queuing delay, so batch size is a tunable knob, not a default maximum.",
        "A residual block learns F(x), not H(x) — reformulating the target as a correction to identity makes near-identity mappings trivially reachable."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"Deployment: edge, cloud, latency, and optimization\" teaches?",
      "choices": [
        "Precision-recall for generative models separates realism from coverage , giving a way to name mode collapse (low recall) as distinct from poor sample quality (low precision) — FID alone conflates the two.",
        "ImageNet normalisation statistics are wrong for satellite data — compute your own per-channel mean and std from your actual training tiles, especially for bands (NIR, SWIR) ImageNet never had.",
        "Drift is physical in this domain — a re-lit aisle or a redesigned package silently shifts the input distribution — so monitor confidence and input statistics continuously, not accuracy on a stale validation set.",
        "SIFT's 128-d descriptor (4×4 cells × 8 orientation bins) is thorough but costly ; ORB trades float descriptors and Euclidean distance for binary strings and Hamming distance to run at video rate on a CPU."
      ],
      "correct": 2,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Why must on-shelf product recognition run on edge hardware near the cameras rather than streaming all raw video to a central cloud region for inference?",
      "choices": [
        "Edge accelerators are always more accurate than cloud GPUs",
        "Cloud inference cannot run quantized models",
        "Bandwidth limits, round-trip latency, and minimizing raw video leaving the premises all favor local processing",
        "Cloud providers do not allow computer vision workloads"
      ],
      "correct": 2,
      "explain": "Dozens of camera streams backhauled continuously would saturate a store's uplink; round-trip cloud latency (often 80-150ms each way) is too slow for near-instantaneous cart tracking; and shipping only derived events instead of raw video meaningfully shrinks the amount of sensitive footage moved off-premises. Edge hardware is not inherently more accurate (A) — it typically runs a compressed, slight",
      "difficulty": "hard"
    },
    {
      "stem": "A teammate quantizes the edge detector to INT8 and reports the model now runs faster but flags almost every product on a newly re-lit produce aisle as \"unknown SKU,\" even though it worked fine before the aisle's lighting was changed. What is the most likely root cause, and what's the fix?",
      "choices": [
        "INT8 quantization is fundamentally incompatible with produce recognition",
        "The calibration data no longer matches current input statistics after the re-light, so INT8 scale/zero-point ranges are miscalibrated for the new lighting",
        "The model needs to be pruned instead of quantized",
        "The tracker's Kalman filter parameters need retuning"
      ],
      "correct": 1,
      "explain": "Post-training INT8 quantization picks numeric ranges (scale and zero-point) from calibration data, and those ranges are only valid if calibration inputs match production inputs. Calibrating on old-lighting images while the aisle now has different color and brightness statistics means activations at inference time fall outside the ranges the quantization was tuned for, degrading accuracy sharply — ",
      "difficulty": "hard"
    }
  ],
  "course-4-computer-vision/unit8#lesson-3": [
    {
      "stem": "Once a new model version passes shadow deployment with healthy live-traffic metrics, the safe next step is to fully replace the production model for all stores immediately, since shadow testing already validated it on real data.",
      "choices": [
        "True",
        "False"
      ],
      "correct": 1,
      "explain": "Answer: False. The standard next step after a healthy shadow deployment is a gradual A/B rollout to a small traffic slice with automatic rollback on regression — not a full immediate swap. Shadow deployment validates that the new model's predictions look reasonable when they aren't yet acted on; it does not prove the model is safe once its outputs actually start affecting customer bills, which onl",
      "difficulty": "easy"
    },
    {
      "stem": "Which statement matches what \"End-to-end systems, pipelines, and responsibility\" teaches?",
      "choices": [
        "Vegetation stress is often invisible in RGB but visible in the red/NIR contrast, because that's the physical mechanism (chlorophyll absorption vs. cell-structure scattering) the stress actually disrupts.",
        "Anchor-free detectors (CenterNet, FCOS) predict centers directly instead of refining hand-tuned anchor priors; DETR reframes detection as transformer-based set prediction, removing NMS entirely at a compute-latency cost.",
        "Gaussian beats box smoothing because it has no hard cutoff (no ringing/false edges), is rotationally symmetric, and — unlike most smoothing shapes — is separable.",
        "The pipeline is a chain of stations, not one model — ingest, detect, track, re-identify, aggregate, feed back — and each handoff has its own failure modes worth monitoring independently."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"End-to-end systems, pipelines, and responsibility\" teaches?",
      "choices": [
        "HOG describes a whole patch's shape as a grid of gradient histograms , making it suited to template-style matching of component or defect silhouettes rather than sparse point matching.",
        "StyleGAN's disentangled per-resolution latent injection is what makes \"same layout, different texture\" controllable generation possible — a capability plain GANs don't offer.",
        "Low-pass filters blur (remove high frequency = edges + noise together); high-pass filters sharpen or expose edges — a filter's behavior is readable straight off whether its weights average or difference neighboring pixels.",
        "Vision and language fuse in two concrete places: OCR-plus-text-classification to disambiguate near-identical packaging, and RAG-style natural-language query over an event index for operations staff."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"End-to-end systems, pipelines, and responsibility\" teaches?",
      "choices": [
        "Closing the one-stage/two-stage accuracy gap does not remove the need for redundancy — multi-camera coverage, sensor fusion, and temporal tracking — in a safety-critical stack.",
        "Shadow deployment and A/B rollout, never a direct swap — a new model proves itself on live traffic before it can affect a single customer's bill.",
        "Difference of Gaussians across a scale pyramid finds a blob's position and size together , the same scale-space idea SIFT reuses for scale-invariant keypoints in Lesson 3.",
        "Fast R-CNN shares one backbone pass across all proposals and uses RoI pooling to extract a fixed-size feature slice per variable-size proposal, cutting inference to under two seconds per image."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"End-to-end systems, pipelines, and responsibility\" teaches?",
      "choices": [
        "HOG describes a whole patch's shape as a grid of gradient histograms , making it suited to template-style matching of component or defect silhouettes rather than sparse point matching.",
        "Synthetic data fills the long tail but should stay a minority share of any class's training examples to avoid overfitting to rendering artifacts.",
        "Whether to treat \"empty\" as a classification class or filter frames with an upstream detector is a real architectural decision , not a detail — it determines whether 80% of your data dominates the loss.",
        "Fairness has to be measured per-subgroup , not just in aggregate — detection and re-identification error rates can and do diverge across demographics, and averaged metrics hide exactly that divergence."
      ],
      "correct": 3,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Which statement matches what \"End-to-end systems, pipelines, and responsibility\" teaches?",
      "choices": [
        "Patchify is the only vision-specific step. A 16×16 patch becomes one token, flattened and linearly projected — the transformer encoder that follows is identical in kind to the one Course 2 used for text.",
        "Data minimization and purpose limitation are design decisions, not policy afterthoughts: ephemeral raw video, persistent anonymized events only, and a hard human-escalation floor under every low-confidence automated decision.",
        "RoIAlign's bilinear-interpolated feature sampling (versus RoI pooling's coordinate rounding) was the specific fix that made per-pixel mask accuracy viable — rounding errors a box regressor tolerates are fatal to a mask.",
        "Quantization, pruning, and distillation compound — distill to a smaller architecture, structurally prune it, then quantize to INT8 — each attacking size and speed from a different angle."
      ],
      "correct": 1,
      "explain": "Straight from this lesson's key takeaways; the others come from different lessons.",
      "difficulty": "medium"
    },
    {
      "stem": "Combining Units 4 and 8. A shopper's hand is detected reaching for a shelf in frame 214 and again in frame 215, each with only 55-60% classifier confidence on which SKU was picked up. Which pipeline stage is specifically responsible for turning these two independent low-confidence detections into one higher-confidence event, rather than r",
      "choices": [
        "The Unit 4 object detector itself, by increasing its confidence threshold",
        "Re-identification across camera views",
        "Tracking, by linking detections across frames and letting confidence average over time",
        "The synthetic data generator"
      ],
      "correct": 2,
      "explain": "Tracking links per-frame detections into a continuous trajectory across time, which is exactly what lets the system treat two weak same-object detections as reinforcing evidence for one identity rather than two separate uncertain guesses — cheaper than brute-forcing higher single-frame accuracy with a larger, slower detector (the point Lesson 2 makes about streaming video versus independent frames",
      "difficulty": "hard"
    },
    {
      "stem": "Combining Course 3 and Course 4. Two SKUs are visually near-identical except for a small printed flavor name on the package, and the vision classifier keeps confusing them. Store staff also want to ask the system plain-language questions like \"how many times was SKU 88213 picked up yesterday afternoon?\" Which combination of techniques add",
      "choices": [
        "A larger convolutional backbone for the classifier, and a SQL dashboard for the queries",
        "OCR plus a lightweight text classifier to read the printed flavor name, and a RAG-style retrieval system over aggregated events for the natural-language query",
        "INT8 quantization for the classifier, and a Kalman filter for the queries",
        "Synthetic data augmentation for the classifier, and knowledge distillation for the queries"
      ],
      "correct": 1,
      "explain": "Reading the printed text directly (OCR plus a small text classifier, drawing on Course 3's sequence-processing techniques) resolves a visual ambiguity that a pure vision classifier struggles with, since the packages are otherwise identical. A RAG-style pipeline (Course 3 Unit 8) — embedding the natural-language question, retrieving matching aggregated events, and having a language model compose a ",
      "difficulty": "hard"
    }
  ]
};

export interface LessonSummary {
  title: string;
  points: string[];
  gist: string;
}

export const unitSummaries: Record<string, LessonSummary[]> = {
  "course-1-deep-learning/unit1": [
    {
      "title": "The perceptron and the linear decision boundary",
      "points": [
        "A perceptron computes w·x + b and thresholds it at zero — the weights encode feature importance and direction, the bias shifts the boundary off the or",
        "The decision boundary is always a hyperplane — a straight line in 2D, a flat plane in 3D, and so on — regardless of how the weights are tuned.",
        "The learning rule only updates on mistakes : w ← w + η(y − ŷ)x , which is why training halts automatically once every point is correctly classified.",
        "For linearly separable data, convergence is guaranteed ; for anything else — like an XOR-shaped \"elevated on exactly one lab value\" rule — no amount o",
        "The historical lesson matters as much as the math: an entire research program stalled for a decade over a limitation that stacking units and adding no"
      ],
      "gist": "In the summer of 1958, a Cornell psychologist named Frank Rosenblatt stood a room-sized machine called the Mark I Perceptron in front of the press and described it as the embryo of a device that would one day walk, talk, and be conscious of its own existence. Strip away the theater and the Mark I was a 20-by-20 grid of cadmium-sulfide photocells wired through 512 motor-driven potentiometers — phys"
    },
    {
      "title": "Activation functions and why nonlinearity is the whole point",
      "points": [
        "Stacked linear layers collapse to one linear layer — W2(W1x+b1)+b2 always simplifies to a single W'x+b' , so nonlinearity is what makes depth meaningf",
        "Sigmoid and tanh saturate on both tails , driving gradients toward zero and slowing or stalling learning in deeper stacks; ReLU saturates only on the ",
        "Leaky ReLU and GELU exist specifically to patch ReLU's dead-unit failure mode , at the cost of a hyperparameter or extra compute respectively.",
        "Output-layer activation depends on the prediction task, not on convention : sigmoid for one binary probability, softmax for mutually exclusive multi-c",
        "A model can appear to train fine with the wrong output activation — loss decreases — while producing predictions that are structurally invalid for the"
      ],
      "gist": "An activation function is a fixed, elementwise nonlinear function applied to the output of a linear layer before that output is passed to the next layer. That definition sounds almost too small to matter — one extra function call sandwiched between two matrix multiplications — but it is the single design choice that separates a neural network from a slightly disguised linear regression. Everything"
    },
    {
      "title": "Layers, width, and depth: stacking into a network",
      "points": [
        "A layer is f(W·x + b) — an affine transform followed by a fixed activation — and stacking these is the entire definition of a multi-layer perceptron.",
        "Shapes carry a batch dimension and a feature dimension ; a layer's weight matrix shape is (n_in, n_out) , and getting an axis wrong produces either a ",
        "Parameter count per layer is n_in·n_out + n_out — arithmetic worth doing before training, since more parameters than labeled patient records is a memo",
        "Width adds parallel learned feature-combinations; depth composes combinations of combinations — neither is strictly better, and depth trades easier tr",
        "Universal approximation proves existence of a solution, not that training will find it — a single wide-enough hidden layer can approximate any continu"
      ],
      "gist": "Think of a single layer the way you'd think of one stage in a lab's sample-processing pipeline. A phlebotomist draws blood and hands over a vial of raw material — the input features. The first workstation doesn't diagnose anything; it just recombines the raw numbers into a new panel of derived readings, the way a chemistry analyzer turns raw absorbance values into glucose and cholesterol figures. "
    }
  ],
  "course-1-deep-learning/unit2": [
    {
      "title": "The forward pass as composed matrix operations",
      "points": [
        "Batching replaces a Python loop with one matrix multiplication — 64 hourly readings become a (64, features) matrix, and every row is processed identic",
        "The shape contract is (batch, in_features) @ (in_features, units) → (batch, units) — the weight matrix's shape never depends on batch size, only on fe",
        "Broadcasting lets a (units,) bias vector add correctly to a (batch, units) pre-activation without a copy or a loop.",
        "Batch-first, row-major layout keeps memory contiguous per-sample and keeps layer weight shapes independent of batch size.",
        "Intermediate activations ( Z1 , A1 , Z2 ) must be cached during the forward pass — Unit 3's backward pass reuses them, and they carry a real memory co"
      ],
      "gist": "Say you're forecasting next-hour electricity demand for a mid-size community center. You've got a year of hourly readings — 8,760 rows, each with temperature, hour-of-day, and an occupancy estimate — and a network from Unit 1 that takes those three numbers in and produces a predicted kWh out. The naive way to get predictions for the whole year is a Python loop: grab row 1, run it through the netwo"
    },
    {
      "title": "Loss functions: turning a prediction into one number",
      "points": [
        "A loss function is just \"prediction + truth → one number,\" but which number depends entirely on which errors you want to punish harder.",
        "MSE squares errors and lets large misses (like a missed demand spike) dominate; MAE treats all error sizes proportionally and is robust to sensor-glit",
        "Binary cross-entropy punishes confidently wrong probability predictions with unbounded loss — a critical property for a rare, costly event like a peak",
        "Categorical cross-entropy generalizes BCE to multiple classes via softmax, and always needs the max-subtraction stability trick to avoid overflow in e",
        "The same set of predictions produces meaningfully different loss values depending which function you apply — the choice is a modeling decision, not a "
      ],
      "gist": "A loss function is a rule that takes a prediction and the true value it should have matched, and returns a single non-negative number that gets larger the more wrong the prediction was. That's the whole definition. Everything else — which specific formula you pick, how it behaves near zero, how it treats a wildly wrong prediction versus a slightly wrong one — is a design decision, and the right on"
    },
    {
      "title": "From per-sample loss to a training objective",
      "points": [
        "Reduction (mean vs. sum) rescales the gradient the optimizer sees; mean keeps loss magnitude stable across batch sizes, sum doesn't — this is why mean",
        "Class weighting / pos_weight compensates for rare-but-costly events (peak-demand trips) that an unweighted average loss would let the model ignore.",
        "Sample weighting generalizes class weighting to per-row control — down-weight bad sensor data, up-weight the hours you most need right.",
        "A falling loss curve proves the optimizer is making progress on its objective; it does not prove the model generalizes.",
        "The loss you optimize (MSE, BCE — chosen for gradient behavior) and the metric you report (MAE in kWh, AUC — chosen for human interpretability) are di"
      ],
      "gist": "Think of a per-sample loss like a single household's electric bill: it tells you exactly how much that one household owes, but it doesn't tell you anything about the utility's overall revenue until you decide how to combine every household's bill into one number. Do you sum all the bills, or average them? Does a home that used ten times the power count ten times as much, or the same as everyone el"
    }
  ],
  "course-1-deep-learning/unit3": [
    {
      "title": "The chain rule on a computational graph",
      "points": [
        "Backprop is reverse-mode automatic differentiation applied to the forward computational graph — not a separate algorithm bolted onto the network, but ",
        "Every node needs only its local gradient , evaluated at the forward-pass values it saw; the multivariable chain rule sums contributions when a value f",
        "Caching forward activations is mandatory because local gradients (ReLU's derivative, a matmul's derivative with respect to its weights) depend on the ",
        "Reverse-mode wins when there are few outputs and many inputs — one scalar loss and thousands of weights is the canonical case, and it is exactly the s",
        "LeCun's 1989 Bell Labs system is the historical bridge from Rumelhart, Hinton, and Williams's theoretical demonstration to a working, economically mot"
      ],
      "gist": "In 1986, David Rumelhart, Geoffrey Hinton, and Ronald Williams published \"Learning representations by back-propagating errors\" in Nature , and the technique finally had a name and an audience. The underlying calculus was not new — Seppo Linnainmaa had described reverse-mode automatic differentiation in his 1970 thesis, and Paul Werbos had proposed applying it to neural networks in 1974 — but those"
    },
    {
      "title": "Backprop through a two-layer network, by hand",
      "points": [
        "Softmax plus cross-entropy collapses to p − y — one of the few places in deep learning where a seemingly complex derivative simplifies to something yo",
        "Weight gradients are always the transposed input times the incoming gradient ( dW2 = hᵀ @ dz2 , dW1 = xᵀ @ dz1 ), and bias gradients are always a sum ",
        "ReLU backprop is a binary mask from the cached pre-activation: a unit that was zero (or negative) on the forward pass gets exactly zero gradient, rega",
        "Gradient shapes must match parameter shapes — this is the single cheapest correctness check available and catches the majority of hand-derivation and ",
        "A small, hand-checkable example (two inputs, two hidden units, three classes) exercises the exact same mechanism as the full 256-input, 10-class netwo"
      ],
      "gist": "A sorting machine flags a scanned envelope crop, runs it through the two-layer network from Units 1–2 — linear, ReLU, linear, softmax — and gets a distribution over the ten digits for that ZIP-code position. Say the true digit is 7 and the network's highest probability landed on 1. The forward pass alone gives no instruction for fixing this: it produces a number, cross-entropy loss, that says how "
    },
    {
      "title": "Gradient descent: batch, stochastic, and mini-batch",
      "points": [
        "The update rule is always θ ← θ − η∇L(θ) — batch, stochastic, and mini-batch gradient descent differ only in how much data is averaged into ∇L(θ) befo",
        "Mini-batches of 32–256 examples are the practical default because they cut gradient noise far below single-example SGD while still matching the vector",
        "An epoch is a full pass over the data; a step is one update — with N training crops and batch size B, one epoch takes N/B steps, and this ratio is wha",
        "The learning rate is the single highest-leverage hyperparameter : too high diverges to NaN , too low crawls without meaningful progress, and a rate ju",
        "Vanishing and exploding gradients are opposite failures of the same chain-rule product across layers — gradient clipping caps explosion by rescaling a"
      ],
      "gist": "Gradient descent is the update rule that turns the gradients from Lesson 2 into an actual improvement in the network: θ ← θ − η · ∇L(θ) , where θ stands for any parameter (a weight matrix, a bias vector), ∇L(θ) is the gradient of the loss with respect to that parameter computed by backpropagation, and η (eta) is the learning rate — a single scalar controlling how big a step to take. Every training"
    }
  ],
  "course-1-deep-learning/unit4": [
    {
      "title": "Momentum: why plain SGD stalls in ravines",
      "points": [
        "Ill-conditioning is a ratio, not a size. A large condition number κ means the stability constraint on the steep direction and the progress rate on the",
        "Momentum's velocity buffer cancels alternating-sign noise and accumulates consistent-sign signal, which is exactly the structure of oscillate-on-steep",
        "β sets an effective averaging window of about 1/(1-β) steps — 10 steps at β=0.9, 100 at β=0.99 — and a bigger window trades faster shallow-direction p",
        "Nesterov's look-ahead mostly pays off at large β or near sharp curvature changes — foot-contact events, object-contact events — not on smooth, static "
      ],
      "gist": "Picture a marble rolling into a canyon — not a smooth round bowl but a long, narrow gorge with near-vertical walls and a shallow slope along the canyon floor toward the exit. Drop it near a wall and it doesn't roll gently toward the far end. It bounces wall to wall, bleeding a little height on each pass, and creeps toward the exit only as fast as friction lets the sideways bouncing die down. Now g"
    },
    {
      "title": "Adaptive methods: AdaGrad, RMSProp, Adam, AdamW",
      "points": [
        "Per-parameter scaling exists because features fire at wildly different rates — a rarely-firing contact feature and an always-firing joint-angle featur",
        "AdaGrad's accumulator only grows , so effective learning rates decay to zero over a long run; RMSProp's EMA replaces the sum and stops that decay.",
        "Adam's bias correction matters most at step 1 , where the uncorrected moments understate the true gradient by a factor tied directly to β1 and β2 — sk",
        "AdamW moves weight decay outside the adaptive denominator so decay strength no longer depends on how often a parameter happens to fire.",
        "Adam wins on heterogeneous features under a fixed budget; SGD+momentum can still win on generalization, memory, and homogeneous-feature policies. Neit"
      ],
      "gist": "A 7-DOF arm learning to grasp has a fingertip force sensor feature that reads nonzero only when the fingertip is actually touching something. Early in training, while the policy is still mostly failing to reach the object at all, that feature fires on maybe 2% of timesteps. Everything else — joint angles, joint velocities, the commanded target pose — updates on every single step. Momentum from Les"
    },
    {
      "title": "Learning rate schedules and how to choose one",
      "points": [
        "A schedule is just lr(step) — it changes the same number for every parameter, unlike Lesson 2's per-parameter adaptive scaling, and the two combine fr",
        "Warmup exists because early gradients are large, noisy, and badly scaled — skipping it risks pushing a policy into an unrecoverable bad region before ",
        "Cosine and one-cycle need a known total budget; plateau and restarts don't — pick based on whether you actually know how many steps you'll get.",
        "The linear scaling rule ties batch size to peak lr : scale both together, and lengthen warmup to match, when you add parallel rollout workers.",
        "The LR range test is a cheap short run that tells you the peak lr before you commit GPU-hours to the real one."
      ],
      "gist": "A learning rate schedule is a function: given the current training step (or epoch), it returns the number you feed into the optimizer's lr argument in place of a fixed constant. That's the whole definition — no adaptivity to gradient statistics, no per-parameter behavior, just a pre-planned or metric-driven curve over time that every parameter shares equally. Everything in this lesson is about whi"
    }
  ],
  "course-1-deep-learning/unit5": [
    {
      "title": "Diagnosing overfitting, and controlling capacity with weight penalties",
      "points": [
        "A widening train/val gap after the validation peak is the practical signature of overfitting — more useful for day-to-day diagnosis than the classical",
        "L2-in-the-loss and weight decay are the same thing only under plain SGD. Under Adam, differentiating an L2 penalty gets it rescaled by the same per-pa",
        "Exclude biases and norm scale/shift parameters from weight decay — decaying them distorts the model's operating point and predicted-probability calibr",
        "L1 induces exact sparsity (useful for pruning uninformative bureau features) but its non-smooth gradient makes it less common inside deep nets than L2",
        "Lambda has no closed-form choice — sweep it on a log scale against a validation slice that resembles the scoring vintage, and watch for underfitting ("
      ],
      "gist": "Your team is training a delinquency model: application fields plus bureau attributes going in, a 90-day-past-due label coming out, roughly 2% of the training vintage positive. Every epoch you log training loss and validation AUC. Epoch 1 through 6, both improve — training loss falls from 0.14 to 0.06, validation AUC climbs from 0.71 to 0.781. Then something changes. Training loss keeps sliding, 0."
    },
    {
      "title": "Dropout, augmentation, and label smoothing",
      "points": [
        "Dropout trains an implicit ensemble of weight-sharing thinned subnetworks; inverted dropout rescales survivors by 1/(1−p) at train time specifically s",
        "Forgetting to gate dropout on a training flag is a silent bug , not a crash — it makes a deployed model's predictions nondeterministic for the same in",
        "SMOTE manufactures synthetic minority rows by interpolating real defaulters' features , which can create bureau-attribute combinations no real applica",
        "Mixup and feature-noise jitter are more defensible on tabular credit data than SMOTE , but should be restricted to continuous fields — linearly interp",
        "Label smoothing curbs overconfident probabilities , but at a 2% base rate the smoothing amount ε must be small (roughly 0.01–0.02) or the softened maj"
      ],
      "gist": "Picture a loan committee that reviews the same file every week, but with a twist: on any given review, a random subset of the underwriters is absent. One week the utilization-ratio specialist is out; the next week it's the person who always keys on recent inquiries; the week after that, two of the five are missing at once. Over time, no single underwriter can let the committee's decision quietly r"
    },
    {
      "title": "Normalization layers and early stopping",
      "points": [
        "Batch norm's train/eval asymmetry — live batch statistics during training, a fixed running-average estimate at eval — means its effective behavior on ",
        "The internal-covariate-shift explanation for batch norm was empirically undercut by Santurkar et al. (2018); the smoother, more predictable loss lands",
        "Layer norm normalizes per example, not per batch , giving it no batch-size dependence and identical train/eval behavior — a safer default when minibat",
        "Batch norm's regularizing effect is incidental (noise from batch composition), disappears at eval time and at large batch sizes, and should not be you",
        "Early stopping needs its own validation signal , separate from the final out-of-time test read, and should restore the best-epoch checkpoint rather th"
      ],
      "gist": "Batch normalization (Ioffe and Szegedy, 2015) is defined, for a given activation and a minibatch of examples, as: subtract the batch mean, divide by the batch standard deviation (plus a small epsilon for numerical stability), then apply a learned per-channel scale γ and shift β . That definition already contains the detail that makes batch norm behave differently from almost every other layer in t"
    }
  ],
  "course-1-deep-learning/unit6": [
    {
      "title": "Convolution as local connectivity and weight sharing",
      "points": [
        "A conv kernel is a small, reusable set of learned weights (e.g. 3×3×C_in numbers) applied via a sliding dot product — this is what makes convolution c",
        "Weight sharing, not invariance, is the mechanism. The same kernel is tried at every spatial position, so a pattern learned once is detected everywhere",
        "Equivariance ≠ invariance: shifting the input shifts a conv layer's output correspondingly (equivariant); the output staying the same regardless of po",
        "Channels-in tells you how deep one filter reaches into the input volume; channels-out tells you how many independently learned filters a layer applies",
        "Early layers learn generic edge and color-opponent detectors (useful for blight's necrotic edges, mosaic's chlorotic color shift); depth is what turns"
      ],
      "gist": "Take a single field photo of a cassava leaf — 224 pixels tall, 224 wide, 3 color channels — and flatten it into a vector to feed a dense layer, the way Unit 2 taught you to. That flattened vector has 224 × 224 × 3 = 150,528 entries. A dense layer with just one hidden unit needs one weight per entry: 150,528 weights, plus a bias, for a single unit that has learned nothing yet. Give the hidden layer"
    },
    {
      "title": "Padding, stride, pooling, and receptive fields",
      "points": [
        "The output-size formula floor((H + 2P − K)/S) + 1 lets you check every layer's shape by hand — treat a shape mismatch as an arithmetic bug to find, no",
        "Stride, not kernel size, controls how much a layer downsamples; \"same\" padding just keeps the kernel itself shape-neutral at stride 1 so stride alone ",
        "Pooling downsamples with a fixed, parameter-free rule (max or average); stride-2 convolutions downsample and learn what to keep, at the cost of extra ",
        "Receptive field compounds across layers via RF_out = RF_in + (K−1)·jump , and every stride multiplies jump going forward — which is why a handful of d",
        "A network's receptive field at its final layer must exceed the physical size of the pattern it needs to recognize as one coherent object, not just det"
      ],
      "gist": "Padding is the number of extra pixel rows/columns of (usually zero-valued) border added around an input before a kernel slides over it. Stride is the number of pixels the kernel jumps between one application and the next. Pooling is a fixed, non-learned downsampling operation — most commonly taking the max or the average over a small window. Those three definitions, plus the kernel size from Lesso"
    },
    {
      "title": "Assembling a working CNN",
      "points": [
        "The conv-BN-ReLU block is the standard unit; halving spatial size while doubling channels at each downsampling step is a reasonable, common default, n",
        "Global average pooling replaces flatten+dense heads, cutting a would-be multi-million-parameter final layer down to zero-parameter pooling plus one sm",
        "A conv layer's parameter count is K·K·C_in·C_out + C_out , and it scales with channel depth only — but the FLOPs to run that layer scale with channel ",
        "1×1 convolutions mix channels with no spatial extent at all — useful as a cheap bottleneck around expensive 3×3 convs.",
        "Skip connections exist to fix an optimization problem (gradient flow through many stacked layers), not a capacity problem — depth past a couple dozen "
      ],
      "gist": "Think of a produce packhouse sorting line. Raw fruit comes off the truck bruised, dirty, oddly shaped, and far too voluminous to inspect by hand one item at a time. It passes through a sequence of stations: a wash station, a size-grading station, a color-grading station, a defect-scanning station — each one narrower in scope than the last, each one operating on the *output* of the previous station"
    }
  ],
  "course-1-deep-learning/unit7": [
    {
      "title": "Recurrence and backpropagation through time",
      "points": [
        "The hidden state is a lossy, fixed-size summary of an arbitrary-length past — it replaces the fixed-window MLP's forced choice between truncation and ",
        "Weight sharing across timesteps ( W_xh , W_hh reused at every step) is what lets one architecture handle a 40-minute admission and a 9-day stay withou",
        "BPTT stores every timestep's activations ; truncated BPTT trades gradient reach for a fixed memory budget by chunking the stay and carrying only the h",
        "The spectral radius of W_hh determines vanishing vs. exploding gradients — the same failure mode from Unit 3, now driven by sequence length instead of",
        "Gradient clipping treats the symptom of explosion, not the cause ; it keeps training numerically stable but does nothing for vanishing, which needs an"
      ],
      "gist": "Say you take the fixed-window MLP from Unit 2 — the one that eats a flat vector of features and outputs a probability — and you point it at ICU vitals. You pick a window, say the last 12 readings, concatenate heart rate, MAP, SpO2, respiratory rate, and the most recent lactate draw into one long vector, and feed it forward. It works, sort of, for the patient who has been in the unit for exactly lo"
    },
    {
      "title": "Gated cells: LSTM and GRU",
      "points": [
        "Four gates, one job split four ways : forget (what to erase), input (what to write), candidate (what to propose), output (what to expose) — all sigmoi",
        "The additive cell-state update c_t = f_t⊙c_{t-1} + i_t⊙c̃_t replaces repeated matrix multiplication with elementwise gating, which is the actual mecha",
        "A high forget gate does not guarantee gradient survival — it makes it possible; a forget gate stuck near 0 still kills long-range signal, it just isn'",
        "Initializing the forget-gate bias positive (often 1–2) starts training in \"remember by default\" mode, which matters directly for catching slow multi-d",
        "GRU trades the separate cell state and two of the four gates for ~25% fewer parameters ; empirically it ties LSTM on most tasks and only meaningfully "
      ],
      "gist": "A Long Short-Term Memory cell (LSTM) is, at its core, a vanilla RNN cell plus a second pipe running alongside the hidden state — the cell state , c_t — and four small neural networks, called gates , that decide what flows into and out of that pipe. Each gate is a sigmoid-activated linear layer over the current input and the previous hidden state, producing a vector of values between 0 and 1 that a"
    },
    {
      "title": "Making sequence models work in practice",
      "points": [
        "Masking has two required halves : zeroing the loss at padded timesteps and stopping the hidden state from recurring through fabricated padding — packe",
        "Bidirectional RNNs are disqualified outright for future-prediction tasks , not merely disadvantaged — the backward pass structurally requires future d",
        "Missingness should be encoded, never zero-filled : a per-channel mask plus a time-since-last-observed delta feature lets the model learn that a stale ",
        "Stateful truncation across batches is what lets a slow multi-day trend (like a lactate climb) survive chunk boundaries — it requires patient-consisten",
        "RNNs still win where attention structurally can't compete : O(1) compute and memory per new timestep for streaming, always-on, resource-constrained mo"
      ],
      "gist": "Think of a batch of ICU patients the way you'd think of a group of hikers who all started a trail at different times and walk at different paces: to move them through a canyon together in lockstep, someone has to decide what the ones who already reached the end are doing while the stragglers are still walking, and if the answer is \"give them meaningless extra steps and count those steps toward the"
    }
  ],
  "course-1-deep-learning/unit8": [
    {
      "title": "A debugging methodology that actually finds the bug",
      "points": [
        "Check the initial loss against ln(num_classes) before anything else — a flat loss at that exact value means zero learning signal, not slow learning, a",
        "Overfitting one batch to near-zero loss is the single highest-value diagnostic — it rules out data-scale and generalization issues at once and isolate",
        "The bug taxonomy is ordered by frequency : label misalignment, un-shuffled data, forgotten eval() , leaked normalization stats, wrong reduction, silen",
        "Bisect the pipeline like a commit range — swap in a trivial model, swap in random labels, disable augmentation — so each test halves the remaining sea",
        "On a shared cluster, a debugging protocol is a budget decision : a ten-minute batch-overfit test is cheaper than an hour-long run repeated five times "
      ],
      "gist": "Loss is 2.303 and it has not moved in 40 epochs. Your team is three weeks into a project classifying facies from a 3-D seismic volume — ten lithology classes, interpreted from well-log ground truth and propagated across a migrated stack that took 400 GPU-hours to preprocess — and the training curve is a flat line. Before you touch a single hyperparameter, look at the number itself: -ln(1/10) = 2.3"
    },
    {
      "title": "Hyperparameter tuning on a real budget",
      "points": [
        "Random search beats grid search on a fixed budget because most hyperparameters don't matter, and random search doesn't waste trials re-covering the on",
        "Tune in order: learning rate, then batch size, then regularization, then architecture — tuning out of order re-derives results a later stage invalidat",
        "Sample LR and weight decay log-uniformly ; sample bounded, roughly-linear quantities like dropout rate uniformly.",
        "ASHA-style early-killing converts \"N full runs\" into \"N cheap runs + a few expensive ones\" — the right default when trials can run at reduced fidelity",
        "A 0.3% improvement with no seed check may just be noise, and tuning on the test set invalidates your final reported number — both mistakes are cheap t"
      ],
      "gist": "In 2012, James Bergstra and Yoshua Bengio published a result that should have ended grid search on the spot: for a fixed compute budget, random search over hyperparameters reliably outperforms grid search, and the reason is almost embarrassingly simple. Most hyperparameters barely affect the outcome. If you lay out a 6×6 grid over two hyperparameters but only one of them actually matters, a grid s"
    },
    {
      "title": "Hardware, memory, and throughput",
      "points": [
        "GPU memory is parameters + gradients + optimizer state + activations — Adam's two moment buffers make its optimizer-state cost alone roughly 2× parame",
        "bf16 needs no loss scaling; fp16 does , because fp16's narrow exponent range lets small gradients underflow to zero — and both keep Adam's moment buff",
        "Gradient accumulation fakes a larger batch without more peak activation memory ; activation checkpointing trades ~20–30% more compute for a large acti",
        "A GPU sitting at 20% utilization is a data-loader problem, not a model problem — more solved by prefetching workers and local caching than by any chan",
        "Model parallelism is only needed when one model copy doesn't fit on one GPU at batch size 1 — data parallelism is the correct default otherwise."
      ],
      "gist": "GPU memory , for training purposes, is the sum of four things that live on the device at once: the model parameters, their gradients, the optimizer's internal state, and the activations saved for the backward pass. Every out-of-memory error on the shared cluster is one of these four growing larger than the card's memory, and knowing which one is the culprit is the difference between a five-minute "
    }
  ],
  "course-2-foundational-models/unit1": [
    {
      "title": "What makes a model \"foundational\"",
      "points": [
        "\"Foundation model\" (Stanford CRFM, 2021) named a practice already three years old — critics rightly note the term is partly branding, but it does name",
        "The three defining ingredients are scale, self-supervision, and generality of representation — not parameter count alone. Generality is the property t",
        "Homogenisation is the same fact viewed twice: shared backbones make adaptation cheap and lift every downstream task at once, and they propagate any sh",
        "Emergent abilities are real in some cases but Schaeffer et al. (2023) showed many \"sharp\" emergence curves are artifacts of a discontinuous metric (li",
        "The ESM protein-language-model lineage is foundational precisely because a masked-residue objective — never mentioning structure — produces representa"
      ],
      "gist": "In 2013, word2vec showed that a shallow network trained to predict neighboring words from a huge unlabeled corpus produced vectors useful for almost any downstream text task — analogy solving, clustering, classification — without ever being told what those tasks were. It was a single, fixed set of embeddings reused everywhere. Five years later, ELMo (2018) showed the vectors could depend on contex"
    },
    {
      "title": "The pretrain-then-adapt pipeline",
      "points": [
        "The pipeline has five stages: corpus curation, objective choice, the pretraining run, the checkpoint as artifact, and adaptation — the first three hap",
        "UniRef50's ~60M sequences illustrate corpus curation at pretraining scale: the work is deduplication and coverage, not labeling.",
        "The adaptation menu runs cheapest-to-priciest: prompting → linear probe → PEFT → full fine-tune each trade compute cost against accuracy and forgettin",
        "The economic asymmetry — millions of GPU-hours once vs. hours per adaptation — is why checkpoints, not individual downstream results, became the field",
        "In frozen feature extraction, the pretrained encoder never receives a gradient ; only the small head trains, which is what makes 400 labelled examples"
      ],
      "gist": "The pretrain-then-adapt paradigm is a two-phase workflow: train one large model once on a broad, unlabeled corpus with a self-supervised objective (pretraining), then reuse that trained model, cheaply and repeatedly, to solve many specific downstream tasks (adaptation). Everything in this lesson is about what happens inside each phase and why splitting the work this way changed how the field alloc"
    },
    {
      "title": "Self-supervision: where labels come from when there are none",
      "points": [
        "UniRef50's ~60M sequences vs. the PDB's ~200k solved structures is the concrete ratio that makes supervised learning infeasible and self-supervision n",
        "A pretext task manufactures its own label from the input by a fixed corruption rule — no human annotation, applicable to every sequence in the corpus ",
        "A good pretext task must be hard enough to force real structure to be learned — too easy or too random teaches nothing transferable.",
        "Shortcut learning happens when a superficial regularity (like near-duplicate sequences) lets the model solve the pretext task without learning the int",
        "Linear probes and k-NN probes judge representation quality using only a small proxy label set or none at all, letting you compare pretraining choices "
      ],
      "gist": "UniRef50 holds roughly 60 million protein sequences. The Protein Data Bank — the entire accumulated output of decades of X-ray crystallography, NMR, and cryo-EM — holds on the order of 200,000 experimentally solved structures. Even generously assuming every solved structure maps to a distinct sequence in UniRef50, that is roughly 0.3% of the corpus carrying the label (\"this sequence folds into thi"
    }
  ],
  "course-2-foundational-models/unit2": [
    {
      "title": "Self-attention from first principles",
      "points": [
        "Attention is direct lookup, not sequential compression. A token attends to every other token in one step, replacing the LSTM's relay race of 284 hidde",
        "Query, key, and value are separate projections because they play conflicting roles — asking, advertising, and delivering content — for the same underl",
        "The √d_k scaling is a variance correction, not a convention. A dot product of d_k independent unit-variance terms has variance d_k; dividing by √d_k r",
        "Attention cost is O(n²) in sequence length — 160,000 pairwise scores per head for a 400-clause contract at clause granularity, but billions at full 48"
      ],
      "gist": "Suppose you hand an LSTM a 400-clause commercial supply agreement, token by token, and ask it a question that only clause 287 can answer: does this indemnification obligation actually apply to the loss in front of us? Clause 287 says the indemnifying party \"shall reimburse the Indemnified Party for all Losses arising from a breach of Section 4.2.\" Whether that sentence means anything depends entir"
    },
    {
      "title": "Multi-head attention and the full transformer block",
      "points": [
        "One head is one weighted average — it can't simultaneously attend strongly to a definition, a carve-out, and a liability cap without compromising betw",
        "Heads split d_model, they don't multiply it : 768 / 12 = 64-dimensional heads, via a reshape-transpose-attend-transpose-reshape pipeline, followed by ",
        "Trained heads specialize measurably — positional, syntactic, and rare/defined-term tracking are documented patterns (Clark et al. 2019, Voita et al. 2",
        "Pre-LN beats post-LN at depth because it keeps the residual stream free of any normalization, giving deep stacks a clean identity path and removing th",
        "One transformer block at d_model=768 is ≈7.09M parameters — roughly 12·d_model², split about a third attention and two-thirds FFN."
      ],
      "gist": "Multi-head attention runs several independent attention computations — heads — in parallel on the same input, each with its own learned Q/K/V projections, and concatenates their outputs before a final linear mix. That's the definition; the reason it exists is that a single attention head is a single weighted average, and a single weighted average cannot represent several genuinely different releva"
    },
    {
      "title": "Position, masking, and the three architecture families",
      "points": [
        "Attention alone is permutation-equivariant — shuffle the input tokens and the outputs shuffle identically, which is exactly wrong for text where order",
        "Sinusoidal encodings use multiple frequencies to give every position a unique fingerprint, and their sine/cosine structure lets relative offsets be ex",
        "RoPE rotates Q/K by position so their dot product depends only on relative offset , which is why it extrapolates to longer sequences better than sinus",
        "Causal and padding masks both work by adding -∞ to forbidden score positions before the softmax , and compose by simple addition — a position needs to",
        "Pick the family by the shape of the task : encoder-only for classification/retrieval over existing text, decoder-only for generation, encoder-decoder "
      ],
      "gist": "Picture the 400 clauses of a supply agreement photocopied onto loose index cards, then dropped and shuffled into a random pile. Self-attention, as built so far, effectively operates on that shuffled pile: each token's output is a weighted sum over every other token's value, and that weighting depends only on how well queries and keys match by content — nothing in the mechanism cares whether a give"
    }
  ],
  "course-2-foundational-models/unit3": [
    {
      "title": "Why splitting text is harder than it looks",
      "points": [
        "The character/word/subword spectrum is a three-way trade between vocabulary size, sequence length, and out-of-vocabulary rate — you cannot minimize al",
        "Word-level tokenizers fail on morphologically rich languages — German compounding and Turkish agglutination generate unbounded vocabularies, and white",
        "The UNK token is a silent information sink — collapsing distinct rare strings to one placeholder makes them indistinguishable to the model, which is w",
        "Normalization (NFKC) fixes encoding inconsistency but casefolding actively destroys meaning in SKUs, model numbers, and Turkish's dotted/dotless i dis",
        "Pre-tokenization draws boundaries the subword algorithm can't cross — and whitespace-based pre-tokenization is close to useless for Japanese, which is"
      ],
      "gist": "Feed a whitespace tokenizer the German catalogue string \"Waschmaschinenzubehör\" and you get exactly one token — a single opaque string meaning \"washing machine accessories\" that the model has almost certainly never seen before, since German compounds are formed on the fly and a corpus can contain thousands of distinct ones. Feed the same tokenizer the Japanese title \"洗濯機用ステンレスホース\" (stainless steel"
    },
    {
      "title": "BPE, WordPiece, Unigram, SentencePiece",
      "points": [
        "BPE is a 1994 compression algorithm , not an ML invention — Sennrich et al. (2016) repurposed byte-pair merging to fix rare/compound-word handling in ",
        "BPE and WordPiece both merge upward from characters but score candidate merges differently — raw co-occurrence frequency for BPE, a likelihood-improve",
        "Unigram prunes downward from a huge candidate vocabulary instead of merging upward, and uniquely supports probabilistic multi-segmentation of the same",
        "SentencePiece removes the whitespace pre-tokenization assumption entirely , treating text as a raw character/byte stream — the direct fix for Japanese",
        "Byte-level BPE has a closed, complete base vocabulary (256 byte values) , so it is structurally incapable of producing an UNK token, unlike character-"
      ],
      "gist": "Byte-Pair Encoding did not start as a machine learning algorithm at all. Philip Gage published it in 1994 as a general-purpose data compression trick: scan a byte stream, find the most frequent adjacent pair of bytes, replace every occurrence with a new byte that stands for that pair, and repeat until you run out of spare byte values or the data stops compressing. It sat there as a compression foo"
    },
    {
      "title": "Embeddings: from token id to vector",
      "points": [
        "The embedding matrix has shape (vocab_size, d_model) and is looked up by index — mathematically equivalent to a one-hot matmul, but always implemented",
        "Embedding parameter cost scales linearly with vocabulary size — a 128k-vocab, d_model-4096 matrix is roughly 524M parameters, often the largest single",
        "Weight tying reuses the input embedding matrix as the output projection , halving the cost of the two largest tensors and adding a mild regularizing e",
        "The same content costs different numbers of tokens in different languages — roughly 1.4x for German and 2.5x for Japanese relative to English in commo",
        "The multilingual token tax has real downstream costs : less usable context window and higher per-request price for languages the tokenizer represents "
      ],
      "gist": "An embedding matrix is a single learned tensor of shape (vocab_size, d_model) — one row per token id, each row a dense vector of length d_model . Tokenization (Lessons 1–2) ends with an integer sequence, like [4471, 892, 15] for a tokenized SKU fragment; the embedding matrix is the lookup table that turns each integer into the vector the rest of the model — the attention blocks from Unit 2 — actua"
    }
  ],
  "course-2-foundational-models/unit4": [
    {
      "title": "Causal language modelling",
      "points": [
        "CLM predicts token i+1 from tokens 0..i , using the causal mask from Unit 2 to prevent any position from seeing its own answer.",
        "Teacher forcing feeds the true prefix , not the model's own generations, which is what makes every position's loss independently computable in one par",
        "The input/label shift is tokens[:, :-1] vs. tokens[:, 1:] — the single most common CLM bug is getting this shift wrong or omitting it.",
        "Perplexity is exp(mean cross-entropy) and reads as an effective branching factor: a well-trained code model sits around 2–4, not near the vocabulary s",
        "Training is parallel across positions; generation is serial across tokens — the same objective that pretrains cheaply is expensive to sample from one "
      ],
      "gist": "Causal language modelling ( CLM ) is the objective that turns a decoder-only transformer into a next-token predictor: given every token up to position i , produce a distribution over the vocabulary for the token at position i+1 , and do this at every position in every training sequence at once. It is the objective behind GPT-family models, and it is the one you will spend the most wall-clock time "
    },
    {
      "title": "Masked language modelling and denoising",
      "points": [
        "MLM exists because a causal model's early-token representations can't see later tokens — a real limitation for whole-function representations needed f",
        "The 80/10/10 split closes the pretrain-finetune mismatch : pure [MASK] would teach the model to build good representations only for a token that never",
        "The 10% random branch forces contextual verification everywhere , and the 10% unchanged branch forces it precisely because the model can't tell which ",
        "T5 span corruption masks contiguous spans with sentinel tokens and reframes reconstruction as sequence generation — a better match to code's syntactic",
        "FIM gets bidirectional-ish infilling out of a purely causal model via document rotation (prefix, suffix, middle) — no architecture change, just a reor"
      ],
      "gist": "Say you want to build code search : given a natural-language query like \"parse a JSON config file and validate required keys,\" retrieve the function in your indexed repositories that does that. To rank candidates you need a single vector representing each whole function — but a causal model, by construction, has never let its representation of line 1 see line 40. Its encoding of the function's ope"
    },
    {
      "title": "Contrastive objectives",
      "points": [
        "Contrastive objectives learn by comparison , pulling positive (docstring, function) pairs together and pushing every other in-batch pairing apart, rat",
        "InfoNCE is a softmax classification loss where the \"class\" for row i is index i itself — the similarity matrix's diagonal is the entire label structur",
        "Temperature trades off signal against noise : τ → 0 overweights the hardest negative and produces noisy gradients; τ → ∞ flattens the softmax and the ",
        "Effective batch size is the difficulty knob for contrastive training specifically, because in-batch negatives scale directly with batch size — a prope",
        "Dual encoders trained contrastively beat generative models for large-scale retrieval because they directly optimize the embedding geometry search depe"
      ],
      "gist": "Think about how you'd teach someone to recognize a composer's style without ever describing the notes: you'd play one of their pieces next to a piece by someone else and ask \"which two sound like the same hand?\" You never reconstruct a missing note; you never generate anything. You just learn a notion of similar versus different by comparison. That's the whole idea behind contrastive pretraining o"
    }
  ],
  "course-2-foundational-models/unit5": [
    {
      "title": "Scaling laws",
      "points": [
        "Chinchilla corrected a methodology bug, not the existence of scaling laws — Kaplan's fixed learning-rate schedule across differing run lengths biased ",
        "C ≈ 6ND comes from counting FLOPs per token : ~2N for the forward pass, ~4N more for the backward pass, giving 6N per token times D tokens.",
        "Compute-optimal allocation solves N ≈ √(C/120) once you substitute the ~20-tokens-per-parameter ratio into C ≈ 6ND — a two-line calculation, not a gri",
        "A straight log-log line is a local promise, not a law of nature — it holds over the compute range it was fit on and bends at data exhaustion, instabil",
        "Compute-optimal and inference-optimal are different objectives — a forecasting system queried every 6 hours forever should often under-shoot Chinchill"
      ],
      "gist": "In 2020, Jared Kaplan and collaborators at OpenAI published a paper that reshaped how the field spent its money. They trained hundreds of small language models across a wide range of parameter counts and dataset sizes, plotted loss against compute on log-log axes, and found something that looked almost too clean: loss falls as a straight line. From that they drew a practical conclusion — for a fix"
    },
    {
      "title": "Depth, width, context length, and the attention bottleneck",
      "points": [
        "Full attention over a raw 0.25-degree grid is a non-starter — roughly 1.04 million tokens per snapshot puts a single head's attention matrix in the te",
        "d_head below roughly 64 starts hurting quality , which is why n_heads and d_model scale together rather than independently.",
        "The KV-cache formula (2 · layers · kv_heads · d_head · seq · batch · bytes) is a direct extension of Course 1 Unit 8's GPU memory arithmetic — worth c",
        "MQA and GQA cut the KV-cache by cutting kv_heads, not by shrinking the model — GQA with 4-8 groups is the standard middle ground between MQA's aggress",
        "Sliding-window, dilated, and axial-factorised attention, plus non-attention operators like GraphCast's GNN and FourCastNet's Fourier operator, are all"
      ],
      "gist": "Tokenize a single global snapshot at 0.25-degree resolution the naive way — one token per grid cell — and you get 721 latitude steps by 1,440 longitude steps, 1,038,240 tokens, before you've added a second variable or a second timestep. Standard self-attention builds an (seq, seq) matrix of pairwise scores. At just over a million tokens, that matrix has roughly 1.08 × 10¹² entries. Stored in bf16 "
    },
    {
      "title": "Mixture of Experts",
      "points": [
        "MoE swaps one dense FFN for N experts plus a router that sends each token to only k of them, decoupling total capacity from per-token compute.",
        "k=2 is the standard because it's the cheapest k that gives the router a soft blend instead of one brittle hard choice — k=1 is faster but noisier to t",
        "Total parameters govern memory footprint; active parameters govern FLOPs per token — a model can have several times more total than active parameters,",
        "Without a load-balancing auxiliary loss, routers tend toward expert collapse — a rich-get-richer dynamic that leaves most experts undertrained, not to",
        "Expert capacity limits, and the token-dropping they force under imbalance, are a real quality cost — MoE trades FLOPs for memory, serving complexity, "
      ],
      "gist": "Mixture of Experts (MoE) replaces a transformer layer's single feed-forward network with several independent feed-forward networks — \"experts\" — plus a small router network that decides, per token, which experts should process that token. Instead of every token flowing through the same dense FFN, a router looks at each token's hidden state and sends it to a small subset of experts, typically the t"
    }
  ],
  "course-2-foundational-models/unit6": [
    {
      "title": "What transfers, and what doesn't",
      "points": [
        "Layer-wise specialization is measurable, not folklore — a per-layer linear probe on frozen hidden states shows accuracy rising through the middle laye",
        "Feature extraction versus full fine-tuning is a data-size decision : below a few thousand labelled examples, freeze the backbone and train only a head",
        "Domain shift and task shift are separate diagnoses — vocabulary and phrasing errors point to domain shift; consistent failures on negation and hedging",
        "Catastrophic forgetting and negative transfer are distinct failure modes — the first erases useful general-purpose structure, the second lets wrong pr"
      ],
      "gist": "Twelve thousand labelled report impressions is, by pretraining standards, a rounding error — the base model saw billions of tokens of web text and perhaps a few hundred occurrences of \"pneumothorax\" scattered across medical-adjacent pages. Worse, the label you need is not just \"this is about a lung\" but \"does this specific sentence assert the finding or deny it.\" A radiologist writes \"no definite "
    },
    {
      "title": "Running a fine-tune that actually works",
      "points": [
        "Fine-tuning learning rates run 10–100x smaller than pretraining (roughly 1e-5 to 5e-5 versus 1e-4 to 5e-4) because a pretrained network needs small nu",
        "Discriminative learning rates follow the layer-wise picture directly — lower layers move least, upper layers and the new head move most — and short sc",
        "Class imbalance needs an explicit fix , not just more data: weighted loss and stratified sampling, evaluated with per-class F1 rather than accuracy, s",
        "A patient-level train/validation/test split is not optional — splitting by report instead of by patient leaks near-duplicate phrasing across the split"
      ],
      "gist": "Fine-tuning is continued gradient-based training of a pretrained model's weights on a smaller, labelled, task-specific dataset, starting from the pretrained weights rather than a random initialization. That one-sentence definition hides most of the difficulty: every hyperparameter that mattered during pretraining — learning rate, schedule, batch size, initialization — needs to be revisited, becaus"
    },
    {
      "title": "Domain-adaptive pretraining and data efficiency",
      "points": [
        "DAPT continues the original pretraining objective on unlabelled in-domain text before any labelled fine-tuning; TAPT does the same but on the unlabell",
        "DAPT's payoff is largest exactly when labelled data is scarce — it shifts the labels-versus-accuracy learning curve left, so 100 labelled examples aft",
        "Tens of millions of in-domain tokens is a reasonable target for continued pretraining to show clear gains; 200,000 report impressions (roughly 10 mill",
        "Few-shot prompting can beat fine-tuning below roughly a few thousand labelled examples ; above that crossover — where the 12,000-report radiology set "
      ],
      "gist": "Think of it the way a general internist prepares before rotating onto a radiology service: they don't start reading chest films by studying labelled cases of pneumothorax versus effusion. They first spend weeks simply reading — textbooks, prior reports, case logs — absorbing the vocabulary, abbreviations, and phrasing conventions of the specialty with no quiz at the end, before ever being asked to"
    }
  ],
  "course-2-foundational-models/unit7": [
    {
      "title": "Why full fine-tuning does not scale to 40 tenants",
      "points": [
        "Full fine-tuning of a 7B model costs ≈112 GB during training — fp32 master weights, bf16 weights, bf16 gradients, and two fp32 Adam moment buffers — w",
        "Storage and serving fail independently of training. Forty full checkpoints cost 40 × 14 GB = 560 GB on disk, and holding 40 resident copies for concur",
        "Intrinsic-dimension results (Li et al. 2018; Aghajanyan et al. 2020) show the update fine-tuning needs is low-rank , and the required rank shrinks fur",
        "That result licenses freezing the base model and learning a small per-tenant delta instead of touching every parameter — the premise the rest of this "
      ],
      "gist": "Picture the deployment plan as it exists before anyone runs the numbers: one 7-billion-parameter base model, fine-tuned separately for each of 40 telecom enterprise tenants — NorthStar Mobile, Continental Fiber, Meridian Wireless, and 37 others — each with its own product catalogue, its own tone (formal for the enterprise fiber accounts, casual for the prepaid mobile brands), and its own escalatio"
    },
    {
      "title": "LoRA and the PEFT family",
      "points": [
        "LoRA computes W' = W + (α/r)·BA ; freezing W means no fp32 master copy, gradient, or Adam state is ever allocated for the full-size matrix — only for ",
        "Zero-initializing B (not A ) guarantees the adapted model starts identical to the base model while still receiving a gradient on B from step one, sinc",
        "Merging BA into W removes all inference overhead but permanently binds one tenant's delta into the weights — exactly the outcome a shared 40-tenant de",
        "QLoRA's three techniques — NF4 quantization, double quantization, paged optimizers — shrink the frozen base's footprint and smooth training-time memor",
        "Bottleneck adapters, prefix tuning, and prompt tuning trade away some or all of LoRA's zero-overhead merge property for different parameter-count and "
      ],
      "gist": "Low-Rank Adaptation (LoRA) , introduced by Hu et al. (2021), reparameterizes a fine-tuning update as a low-rank correction to a frozen weight matrix. For a pretrained weight W of shape (d_out, d_in) , LoRA introduces two small matrices, B of shape (d_out, r) and A of shape (r, d_in) , where the rank r is a hyperparameter far smaller than d_in or d_out — typically 4 to 64 against hidden sizes in th"
    },
    {
      "title": "Instruction tuning",
      "points": [
        "T0 and FLAN (2021) established that instruction-formatted multitask fine-tuning generalizes to unseen tasks; InstructGPT (2022) extended this to open-",
        "Loss must be masked with -100 on every system and user token and computed only on assistant-response tokens, including the role marker and terminator ",
        "Multi-turn packing must track document boundaries and enforce them through the attention mask; for a multi-tenant deployment, a missing boundary betwe",
        "Format overfitting, sycophancy, and capability regression outside the tuning mix are the three specific failure modes to check for after any instructi"
      ],
      "gist": "In 2021, two papers landed within weeks of each other and changed what \"fine-tuning\" meant for language models. Sanh et al.'s T0 and Wei et al.'s FLAN both took a pretrained model and fine-tuned it — not on one task, but on dozens of NLP tasks at once, each one reformatted into a natural-language instruction and a response. The finding that mattered: performance improved even on task types the mod"
    }
  ],
  "course-2-foundational-models/unit8": [
    {
      "title": "Evaluation that isn't theater",
      "points": [
        "A public benchmark score is evidence about the benchmark , not about your task — contamination and format mismatch both inflate it independent of real",
        "A held-out eval needs hundreds of graded examples , not dozens, before a few-point difference between releases means anything statistically.",
        "LLM judges have specific, documented biases — position, verbosity, self-preference — mitigated by order-swapping, rubric scoring, and cross-family jud",
        "A frozen regression suite of past failures , re-run every release, is the only defense against silently reopening a bug you already fixed.",
        "Legally consequential outputs need a human-reviewed eval slice in addition to automated judging, not as a replacement for it."
      ],
      "gist": "Your evaluation dashboard says the model scores 78% on a public benchmark, comfortably ahead of last quarter's release. Then a caseworker on the disability-premium desk flags a transcript: a claimant asked whether her son's carer's allowance counts against the savings-disregard threshold, and the assistant answered with total confidence and the wrong number. Both facts are true at once, and they a"
    },
    {
      "title": "Alignment: RLHF, RLAIF, and the direct alternatives",
      "points": [
        "The three-stage recipe — SFT, then a Bradley-Terry reward model on preference pairs, then RL policy optimization — traces to Christiano et al. 2017 an",
        "The KL penalty against the frozen reference policy is what keeps PPO from reward hacking; removing it can produce confidently wrong, fluent, on-brand ",
        "Reward hacking is a predictable consequence of optimizing hard against any proxy metric, not a rare accident — it shows up as answers that score well ",
        "DPO replaces the reward model and RL loop with a single supervised loss over the same log-probability ratios used in pretraining, at the cost of being",
        "RLAIF and Constitutional AI substitute a written set of principles for some human labeling, but a human-reviewed audit slice is still required for leg"
      ],
      "gist": "In 2017, Christiano, Leike, and colleagues showed you could train an Atari-playing agent from nothing but pairwise human preferences over short video clips — no hand-written reward function at all. A person watches two brief clips and picks the better one; a small reward model learns to predict that preference; reinforcement learning optimizes against the learned reward instead of the game's built"
    },
    {
      "title": "Deployment: latency, cost, and guardrails",
      "points": [
        "Quantization degrades tail behavior first — precise thresholds, rare facts, multi-step reasoning — while average fluency survives; validate against a ",
        "The KV cache, not the weights, is usually the binding memory constraint at serving time for long conversations; paged attention manages it the way vir",
        "TTFT and TPOT are separate user experiences driven by different levers — batching and speculative decoding trade one kind of latency and throughput ag",
        "Output tokens cost more than input tokens because generation is serial; cost per million tokens is a real budget line that scales with model size and ",
        "Auditability and drift detection are not optional on a legally consequential assistant — they are the deployment-time analog of the regression suite f"
      ],
      "gist": "Latency is how long a claimant waits for an answer to start, and to finish. Cost is what the agency pays per conversation to produce it. Neither is a footnote to model quality — for a benefits-eligibility assistant serving call-center chat volume, a four-second time-to-first-token feels broken regardless of how correct the eventual answer is, and a cost of forty cents per conversation, multiplied "
    }
  ],
  "course-3-text-processing/unit1": [
    {
      "title": "The preprocessing pipeline",
      "points": [
        "Preprocessing is always lossy — there is no \"clean\" version of a text that preserves all information; every step is a trade-off you should make delibe",
        "NFKC normalisation is a security control for moderation systems , not just cosmetic cleanup — it closes homoglyph and compatibility-character evasions",
        "Case folding helps sparse bag-of-words models but can delete shouting/emphasis signal that a moderation classifier specifically needs.",
        "URLs, mentions, and hashtags each need their own treatment — placeholder tokens usually beat both keeping the raw string and dropping it outright.",
        "Emoji and repeated-character elongation carry sentiment and intent — capping repetition instead of collapsing it preserves that signal while still con"
      ],
      "gist": "Somewhere on a review queue sits this post: SOOO excited!!! 😍 #blessed @friend http://x.co . A moderation model — say, one flagging spam, harassment, or coordinated bot activity — never sees those sixty-odd characters directly. Something has to turn them into the fixed-shape numeric input a model expects, and whoever writes that \"something\" makes a dozen small decisions along the way, each of whic"
    },
    {
      "title": "Tokenization: word, subword, character",
      "points": [
        "A token is whatever unit a model treats as atomic — the boundary is a design choice, not a fact about language.",
        "Whitespace tokenization fails on contractions, multi-word entities, glued punctuation, and glued emoji — all common in social posts.",
        "Word-level vocabularies hit an OOV wall on invented spellings, elongation, and leetspeak obfuscation — exactly the adversarial patterns moderation sys",
        "Subword tokenization (BPE/WordPiece) solves OOV by composing rare or unseen words from frequent sub-pieces , which is why it is the modern default for",
        "Character/byte tokenization has a closed, complete vocabulary and cannot produce true OOV , but pays for that robustness in much longer sequences and "
      ],
      "gist": "A token is the smallest unit of text a model treats as one item — the atomic thing that gets mapped to a vector, attended over, and predicted. That definition sounds simple until you try to pin down where one token ends and the next begins in real text, and social posts are exactly where the simple version breaks. This lesson works through three ways of drawing token boundaries — splitting on word"
    },
    {
      "title": "Stemming, lemmatization, stopwords, and the classical normalisation stack",
      "points": [
        "The Porter stemmer (1980) and the classical normalisation stack were built for 1970s–80s information retrieval , where cheap exact-match indexing matt",
        "Stemming is fast and rule-based but can produce non-words and false conflations (e.g., \"bully\" collapsing toward \"bull\") — lemmatization is slower and",
        "Stopword removal can delete the exact word that carries meaning — negation words like \"not\" are stopwords, and removing them can flip a sentence's mea",
        "N-gram features are one direct fix for the negation problem , since a bigram like \"not_hurt\" survives as one unit where individually-scored words don'",
        "Modern subword transformers skip nearly this entire classical stack — but it still lives on inside sparse retrieval indexes and classical bag-of-words"
      ],
      "gist": "In 1980, Martin Porter published a short, deliberately crude algorithm for stripping suffixes off English words — five phases of hand-written rules that turn \"moderation,\" \"moderating,\" and \"moderated\" all into \"moder.\" The Porter stemmer was built for a world where computing a document's relevant words mattered more than computing them elegantly: the information retrieval (IR) systems of the 1970"
    }
  ],
  "course-3-text-processing/unit2": [
    {
      "title": "The Bag-of-Words model",
      "points": [
        "Bag-of-words maps each document to a vector of term counts over a fixed vocabulary — the vector-space model — discarding all word order in the process",
        "The document-term matrix at real corpus scale (50k docs × 100k terms) is over 99.9% zero; sparse storage (e.g., CSR) keeps memory proportional to actu",
        "BoW cannot distinguish \"dog bites man\" from \"man bites dog,\" or reliably track negation — a real limitation that motivates n-grams (Lesson 3).",
        "Cosine similarity compares document vectors by angle, not magnitude, so it is insensitive to document length — the right default metric for sparse cou",
        "Because the dot product in cosine similarity only accumulates over shared nonzero terms, it is cheap to compute even on very high-dimensional sparse v"
      ],
      "gist": "The bag-of-words model (BoW) represents a document as an unordered multiset of its tokens — a \"bag\" you could shake, losing all information about where each word sat relative to the others, but keeping exactly how many times each one appears. Formally, given a fixed vocabulary V — the set of all distinct terms across a corpus, after the tokenization and normalization steps from Unit 1 — every docu"
    },
    {
      "title": "TF-IDF: weighting words by informativeness",
      "points": [
        "Raw counts rank terms backwards: ubiquitous boilerplate (\"agreement\") gets high weight, rare discriminative terms (\"indemnification\") get low weight —",
        "Term frequency variants (raw, log-scaled, augmented) all measure local prominence; log-scaling and augmentation both damp the effect of a term repeati",
        "Inverse document frequency , idf(t) = log(N / (1 + df(t))), rewards rarity across the corpus; the \"+1\" smooths against zero-division and the log compe",
        "L2 normalization puts documents of different lengths on a common scale and turns a dot product into a cosine similarity.",
        "TF-IDF is still bag-of-words: \"car\" and \"automobile\" are orthogonal dimensions with zero shared signal — closing that gap is the job of embeddings, no"
      ],
      "gist": "Take a corpus of ten thousand commercial contracts and count raw word frequencies: \"agreement\" appears in essentially every single one — it is boilerplate, present in the first line of nearly every contract regardless of subject matter — while \"indemnification\" appears in only about 3% of them, concentrated in the contracts that actually carry indemnification clauses. If a classifier or search ran"
    },
    {
      "title": "N-grams and the sparsity wall",
      "points": [
        "N-grams (bigrams, trigrams) recover local word order that unigram bag-of-words discards — critical for legal negation flips like \"not liable\" versus \"",
        "Moving from unigrams to bigrams to trigrams causes a combinatorial explosion in vocabulary size, worsening the sparsity that was already extreme at th",
        "Count-based n-gram language models estimate P(word | preceding words) from raw corpus counts, which assigns exactly zero probability to any unseen n-g",
        "Add-k smoothing floors every count above zero; Kneser-Ney smoothing improves on this by weighting words by how many distinct contexts they appear in, ",
        "Perplexity measures how well a language model predicts held-out text; n-gram models plateaued because fixed-window context plus exploding sparsity is "
      ],
      "gist": "Think of reading a contract one word at a time through a mail slot that only shows a single word before sliding to the next — that is unigram bag-of-words, and it is why \"the defendant is not liable\" and \"the defendant is liable\" can look deceptively similar once counted as isolated words: both contain \"defendant,\" \"is,\" and \"liable.\" Widen the mail slot to show two words at a time, and a new unit"
    }
  ],
  "course-3-text-processing/unit3": [
    {
      "title": "The distributional hypothesis and dense vectors",
      "points": [
        "TF-IDF's fatal gap: one dimension per word makes every pair of distinct words orthogonal by construction — it cannot represent that \"car\" and \"automob",
        "Dense vectors buy geometry: compressing a large vocabulary into ~100–300 real-valued dimensions forces shared structure to emerge, so related words en",
        "Cosine similarity, not Euclidean distance, is the standard comparison for word/document vectors because it measures direction (meaning) and ignores ma",
        "The king-man+woman=queen result shows embeddings encode relationships as linear offsets, not just proximities — but the result is a famous cherry-pick",
        "The distributional hypothesis (Harris, formalized; Firth, popularized) — words in similar contexts have similar meanings — is the theoretical bet ever"
      ],
      "gist": "In 1957 the linguist J.R. Firth wrote a sentence that outlived nearly everything else he published: \"You shall know a word by the company it keeps.\" He was not talking about machine learning — word2vec was fifty-six years in the future — but he had put his finger on the exact idea that would eventually let a computer know that \"JavaScript\" and \"ECMAScript\" are the same skill wearing two names. Fir"
    },
    {
      "title": "Word2vec and GloVe: how the vectors are learned",
      "points": [
        "Skip-gram predicts context from center word; CBOW predicts center word from averaged context — skip-gram generally wins on rare words because it gener",
        "Full-vocabulary softmax is the bottleneck: a million-word vocabulary makes exact softmax training computationally infeasible at corpus scale.",
        "Negative sampling converts the problem into k+1 binary logistic regressions per training pair — one real pair pushed toward \"yes,\" k sampled noise pai",
        "The unigram^0.75 exponent is an empirically-tuned smoothing factor that boosts rare-word sampling rate and damps ultra-frequent filler words, without ",
        "Window size trades syntactic for topical similarity — small windows cluster grammatically interchangeable words, large windows cluster words that shar"
      ],
      "gist": "Word2vec is a family of two related shallow neural network architectures — skip-gram and CBOW — that learn a dense vector for every word in a vocabulary by training the network to predict word co-occurrence from a large corpus, then discarding the prediction task and keeping only the learned weight matrix as the embedding table. That one-sentence definition hides a genuinely clever engineering tri"
    },
    {
      "title": "Limits: polysemy, bias, and OOV",
      "points": [
        "One vector per word-string means word2vec/GloVe cannot separate senses — \"python\" the language and the snake share a single, blended vector, causing f",
        "Contextual embeddings (BERT, Unit 5) compute a vector per occurrence , not per word-string, which is the structural fix for polysemy that static embed",
        "Bias is not a training bug: embeddings faithfully encode whatever associations the training corpus contains, including historical hiring-related gende",
        "WEAT quantifies embedding-level bias by comparing target-word similarity to two attribute-word sets — a large, consistent gap signals absorbed associa",
        "Debiasing (e.g., projecting out a gender direction) is partial: correlated, indirect bias survives even after the identified axis is removed (Gonen & "
      ],
      "gist": "A resume-matching system built on the word2vec and GloVe vectors from Lesson 2 will, sooner or later, confidently do something wrong. Ask it for candidates similar to \"python\" and it will happily surface people who mentioned reptile handling on a hobby line, because word2vec assigns exactly one vector to the string \"python\" and that single vector is an average of every context the word ever appear"
    }
  ],
  "course-3-text-processing/unit4": [
    {
      "title": "Neural language modelling",
      "points": [
        "Neural LMs generalize where n-grams memorize: a continuous hidden state lets similar-but-not-identical contexts produce similar predictions, which is ",
        "Three-stage architecture: embedding lookup → LSTM recurrence (built on the Course 1 Unit 7 cell) → linear projection to vocabulary-sized logits, softm",
        "Teacher forcing trains in parallel by feeding ground-truth previous tokens rather than the model's own predictions, trading a train/inference mismatch",
        "Sampling strategy is a UX decision: greedy for the single inline ghost-text suggestion, top-k/temperature for a ranked row of chips, nucleus sampling "
      ],
      "gist": "Type \"I'll call you when I get\" on a phone keyboard trained with the smoothed trigram model from Unit 2, and the suggestion bar goes blank more often than you'd like. The trigram model only knows what it saw during training: it looks up the two preceding words, \"get\" and whatever came before it, in a giant count table, and if that exact pair never preceded a useful continuation in the training cor"
    },
    {
      "title": "Making it work: perplexity, tied weights, and the softmax bottleneck",
      "points": [
        "Perplexity is the target metric — exponentiated average negative log-likelihood; keyboard LMs aim for roughly 20–60, lower for personalized models wit",
        "Weight tying shares the embedding and projection matrices, roughly halving parameters in embedding-dominated small models, with a side benefit of a sl",
        "Adaptive/hierarchical softmax exploit Zipfian word frequency to make the vocabulary-sized final layer cheap on average, since a small head cluster res",
        "Gradient clipping and truncated BPTT keep training stable and affordable on effectively unbounded streaming text; variational dropout regularizes with"
      ],
      "gist": "Perplexity is the standard evaluation metric for a language model: it is the exponentiated average negative log-likelihood the model assigns to held-out text, PPL = exp(-1/N Σ log p(w_i | context)) . Read it as \"the effective number of equally-likely choices the model is confused between at each position\" — a perplexity of 1 means the model is certain and always right, a perplexity equal to the vo"
    },
    {
      "title": "Deploying an on-device LSTM",
      "points": [
        "The phone budget is single-digit milliseconds and a few megabytes, forcing quantization (typically int8, ~4x smaller) as close to mandatory, with a mo",
        "On-device fine-tuning personalizes without exporting raw text; federated learning extends personalization across users by aggregating model updates, n",
        "Cold start on unseen words is unavoidable for any fixed-vocabulary model; a character-level or n-gram fallback and a small personal word cache cover t",
        "LSTMs persist on-device because of O(1) per-step state, not because they're more accurate than a transformer — streaming cost and memory footprint are"
      ],
      "gist": "Think of the difference between a cloud kitchen and a food truck. A cloud kitchen can stock an entire pantry, run multiple ovens, and take ten minutes to plate an elaborate dish, because the customer isn't standing at the window watching the clock. A food truck has one small grill, a handful of ingredients that fit in the van, and has to hand over food in under a minute or the line stops moving an"
    }
  ],
  "course-3-text-processing/unit5": [
    {
      "title": "Two families from one architecture",
      "points": [
        "Bidirectional attention (MLM, Course 2 Unit 4) gives BERT full context on a fixed span, which is exactly what classification, extraction, and stance d",
        "The causal mask (CLM, Course 2 Unit 4) is not a limitation to work around in GPT — it is the property that makes autoregressive generation possible at",
        "[CLS] pooling turns a variable-length sequence into one fixed vector for BERT's classification head; mean pooling is a viable alternative but not the ",
        "On financial news: BERT owns headline sentiment, ticker/company extraction, market-moving-vs-routine classification, and stance detection; GPT owns ge",
        "Neither family gets the other's skill for free — fine-tuning a decoder to \"classify\" means training it to generate a label token, an indirect route BE"
      ],
      "gist": "A transformer is a single architecture, but the direction you point its self-attention mask splits it into two model families with almost opposite skills. Encoder-only models like BERT attend in both directions at once — every token sees every other token, before and after it in the sequence — which makes them experts at understanding a fixed span of text but structurally incapable of generating o"
    },
    {
      "title": "Applying BERT: fine-tuning for understanding tasks",
      "points": [
        "The fine-tuning recipe from Course 2 Unit 6 — small learning rate, few epochs, task head on the pretrained trunk — makes 2,000 labeled headlines worka",
        "Token classification requires aligning per-word labels to sub-word tokens; label only the first WordPiece of each word and mask continuations with -10",
        "[SEP] plus segment embeddings let one BERT forward pass handle sentence-pair tasks like headline-versus-analyst-quote stance detection.",
        "Domain-adaptive pretraining (the FinBERT pattern) fixes vocabulary and word-sense mismatch by continuing MLM on unlabeled finance text — cheaper than ",
        "[CLS] pooling is the trained default for classification heads; mean pooling is worth testing on small datasets but is not a free substitute."
      ],
      "gist": "Your news feed forwards 50,000 raw earnings headlines a day, and a research analyst has hand-labeled 2,000 of them bullish, bearish, or neutral. That is nowhere near enough data to train a transformer from scratch — a randomly initialized 110-million-parameter encoder would memorize the idiosyncrasies of those 2,000 examples long before it learned anything general about market language, and it wou"
    },
    {
      "title": "Applying GPT: prompting, in-context learning, and when to fine-tune",
      "points": [
        "In-context learning changes model behavior entirely within a forward pass — no weights are updated, and why it works as well as it does remains a genu",
        "Prompt format (example order, label wording, whitespace) can swing accuracy by ten points or more; treat prompts like code that needs testing, not ins",
        "For high-volume, fixed-schema classification (50k headlines/day, three labels), a small fine-tuned BERT usually wins on latency, cost, and determinism",
        "Generation tasks — analyst-style summary paragraphs — are exclusively GPT's territory, because BERT's architecture cannot produce novel fluent text at",
        "Structured extraction (tickers, companies) can go either way: a fine-tuned tagger is cheaper at scale, a prompted model with JSON-mode/schema constrai"
      ],
      "gist": "Fine-tuning a BERT classifier is like training an in-house junior analyst: weeks of onboarding on your specific ticket types, but afterward they process a headline in an eye-blink and give the same answer every time given the same input. Prompting a large GPT model is like calling a sharp outside consultant: no onboarding at all — you hand over a few examples on a sticky note and a question, and a"
    }
  ],
  "course-3-text-processing/unit6": [
    {
      "title": "Sequence labelling and tagging schemes",
      "points": [
        "BIO/IOB2 encodes both boundary (B vs I vs O) and type in one tag per token, with the hard constraint that I-TYPE must follow B-TYPE or I-TYPE of the s",
        "BIOES/BILOU adds explicit end (E/L) and single-token (S/U) tags, typically buying 1–2 F1 points by giving the model a direct signal for span boundarie",
        "Flat tagging schemes assign exactly one label per token, so they structurally cannot represent nested or overlapping entities like \"stage II breast ca",
        "Span-based tagging (score candidate start/end pairs directly) trades higher compute for the ability to keep overlapping spans, and is the standard esc",
        "Clinical notes are dominated by O tokens (often 90%+), which makes token-level accuracy a misleading training and evaluation signal from the very firs"
      ],
      "gist": "Named entity recognition (NER) is the task of finding spans of text that refer to a category of real-world thing — a drug, a dose, a disease, a symptom — and labelling each span with its type. The standard way to make this trainable is to turn it into sequence labelling : a per-token classification problem, where every sub-word token in a note gets exactly one label from a fixed tag set, and a fin"
    },
    {
      "title": "Models for NER: from CRF to BERT",
      "points": [
        "Independent per-token softmax (plain HMM emissions or a naive classification head) can emit illegal BIO sequences like an I-DRUG with no preceding B-D",
        "A linear-chain CRF fixes this by scoring whole tag sequences with emission + transition scores, and Viterbi decoding finds the best legal sequence in ",
        "BiLSTM-CRF (2015–2018) paired neural feature extraction with a CRF's transition constraints and was the dominant clinical NER architecture before BERT",
        "Plain fine-tuned BERT token classification now matches or beats BiLSTM-CRF on most benchmarks because its contextual representations implicitly learn ",
        "Constrained decoding — masking illegal transitions at inference time without learning a transition matrix — gets most of a CRF's benefit at a fraction"
      ],
      "gist": "Before transformers, extracting drugs and diagnoses from clinical text was a decade-long arms race against one specific failure mode: models that scored each token independently would happily emit O I-DRUG O or B-DISEASE I-DRUG — tag sequences that are locally plausible token-by-token but globally nonsensical, because nothing enforced the BIO grammar from Lesson 1 across positions. The history of "
    },
    {
      "title": "Text classification and evaluation done right",
      "points": [
        "High accuracy on an imbalanced clinical dataset is easy to achieve and easy to be meaningless — always check class balance before trusting an accuracy",
        "A note can belong to multiple specialties at once, making note-routing a multi-label problem (independent per-label sigmoids), not a multi-class one f",
        "Recall should usually be prioritized over precision for adverse-event detection, since a missed event is far costlier than a false alarm a reviewer di",
        "Macro-averaging is the honest choice when rare classes (rare diseases, rare adverse events) must not be masked by common ones; micro and weighted aver",
        "Entity-level F1 for NER requires an exact span-and-type match — a partially correct dosage span counts as a full miss, matching the real clinical cost"
      ],
      "gist": "A team builds a classifier to flag clinical notes that mention an adverse drug event, reports 96% accuracy on the held-out test set, and ships it. Three months later a pharmacovigilance auditor discovers the model missed a documented case of drug-induced lactic acidosis that led to a hospital readmission — the note was sitting in the \"no adverse event\" bucket the entire time. Nobody lied about the"
    }
  ],
  "course-3-text-processing/unit7": [
    {
      "title": "The encoder-decoder framework and decoding",
      "points": [
        "Cross-attention is the fact-transfer channel. Every decoding step queries the full encoder output; a fact that never gets attention weight never reach",
        "Greedy decoding commits early and can't undo commitments — beam search keeps multiple hypotheses alive so later context can resolve ambiguity greedy d",
        "Raw beam scores favor short sequences because every token multiplies in a probability less than one; length normalization ( score / length^alpha ) res",
        "Exposure bias comes from teacher forcing : training never lets the model recover from its own error, so at inference one early wrong token can produce",
        "Coverage tracking — accumulated attention mass per source token — is a cheap, checkable signal for under- or over-translation, useful as an automated "
      ],
      "gist": "At 4:12 a.m., six hours after an earthquake, a community health worker in Léogâne sends a WhatsApp voice note in Haitian Creole: \"gen moun anba bilding lan bò mache a, nou bezwen èd kounye a\" — there are people under the building near the market, we need help now. A translation pipeline turns this into English for the dispatch team deciding where to send a search-and-rescue crew. If the model outp"
    },
    {
      "title": "Evaluation and the faithfulness problem",
      "points": [
        "BLEU = n-gram precision × brevity penalty ; it requires exact string matches, so a valid synonym substitution can tank the score even when meaning is ",
        "BLEU is especially unreliable for morphologically rich, low-resource languages (Swahili, Rohingya) because word boundaries and morpheme choices vary i",
        "chrF's character-level n-grams degrade gracefully under morphological variation where BLEU's word-level n-grams collapse entirely — prefer chrF for th",
        "COMET and BERTScore use learned embeddings to catch semantic equivalence missed by surface metrics, but remain blind to whether a specific fact or num",
        "ROUGE's recall orientation means unsupported additions are never penalized — a padded or partly fabricated summary can still score at ceiling if it ha"
      ],
      "gist": "An evaluation metric for text generation takes a generated hypothesis and one or more human reference texts and returns a single number meant to correlate with human judgment of quality. The oldest and still most widely reported such metric for translation is BLEU (Bilingual Evaluation Understudy, Papineni et al. 2002): the geometric mean of n-gram precision — what fraction of the hypothesis's uni"
    },
    {
      "title": "Low-resource and production realities",
      "points": [
        "Transfer and multilingual models (mBART, NLLB) let a low-resource pair borrow structure from resource-rich neighbors , and enable zero-shot translatio",
        "Back-translation helps only as far as the reverse model is competent — with a weak reverse model (the norm for pairs like Rohingya), it bakes in a sys",
        "Extractive summarization trades fluency for traceability : every claim in the output is literally sourced verbatim, which is why high-stakes pipelines",
        "Hierarchical summarization needs overlapping chunks and cross-chunk entity tracking — otherwise a fact that straddles a chunk boundary is silently dro",
        "Entity-preservation checks are a cheap, mechanical safety net , but the highest-stakes messages — exact casualties, exact locations — still belong in "
      ],
      "gist": "Picture a relief coordinator who speaks fluent French and English but no Haitian Creole. Handed a stack of Kreyòl messages, she isn't starting from zero: Kreyòl's vocabulary is largely French-derived, so cognates, sentence patterns, and a good chunk of the words are already familiar to her from a language she does know well. She doesn't need to learn Kreyòl from scratch to make a useful first pass"
    }
  ],
  "course-3-text-processing/unit8": [
    {
      "title": "Sentiment and aspect-based opinion mining",
      "points": [
        "Document-level sentiment loses information a business needs whenever a review is mixed, which is common — aspect-level granularity is what turns raw t",
        "ABSA is two subtasks: aspect term extraction (sequence tagging, like NER) and per-aspect sentiment classification, solvable as a pipeline (simpler, er",
        "Negation scope, sarcasm, comparatives, and implicit aspects are the four recurring failure modes — each defeats a naive local-window or bag-of-words a",
        "Evaluate per-aspect, not overall — class imbalance across aspects and polarities means a high aggregate accuracy can hide total failure on the rare as"
      ],
      "gist": "A customer writes: \"the battery is amazing but the screen cracked in a week.\" Feed that sentence into a document-level sentiment classifier — the kind you'd have built in Course 3 Unit 5 with a fine-tuned encoder and a softmax head — and it has to collapse two contradictory facts into one label. Average the polarity and you get \"neutral,\" which is a lie: nothing about this review is neutral. Pick "
    },
    {
      "title": "Conversational systems",
      "points": [
        "ELIZA (1966) through modern LLM assistants spans two lineages — task-oriented (intent + slots + fixed backend actions) and open-domain retrieval-based",
        "Task-oriented systems decompose into intent classification, slot filling (BIO tagging, same mechanism as NER/ABSA), and dialogue state tracking — losi",
        "Pure generation hallucinates company facts structurally , because model parameters are a frozen, lossy snapshot of training data that likely never con",
        "Guardrails apply on both input and output , reusing Course 2 Unit 8's filtering architecture — an assistant that only screens user input is still expo",
        "Evaluate task success rate separately from turn-level accuracy — perfect per-turn scores can still add up to a failed conversation if state tracking d"
      ],
      "gist": "In 1966, Joseph Weizenbaum built ELIZA at MIT — a program that played a Rogerian psychotherapist by matching patterns in the user's typed input against templates (\"I am ___\" triggers \"Why do you say you are ___?\") and reflecting the pattern back as a question. It had no model of meaning, no memory beyond the current line, and no idea what a \"therapist\" was doing. It also convinced some users they "
    },
    {
      "title": "Retrieval-augmented generation",
      "points": [
        "RAG's pipeline is chunk → embed → index → retrieve top-k → rerank → stuff into prompt → generate with citations — every stage reuses a mechanism taugh",
        "RAG beats pure parametric generation on stale facts (re-index a changed doc instead of re-training a model) and beats pure keyword search on paraphras",
        "Chunk size is a trade-off, not a solved parameter — too large dilutes relevance and wastes prompt budget, too small strips away needed context; overla",
        "Four distinct failure modes — retrieval misses, the model ignoring good context, contradictory chunks, and unfaithful citations — each need different ",
        "Evaluate retrieval recall@k and answer faithfulness separately — they diagnose different halves of the system, and a system can score well on one whil"
      ],
      "gist": "Retrieval-augmented generation (RAG) is an architecture that answers a query by first retrieving relevant passages from an external document store, then conditioning a generative model on those passages to produce the final answer — grounding the model's output in retrieved evidence rather than relying solely on facts baked into its parameters during training. That's the whole idea in one sentence"
    }
  ],
  "course-4-computer-vision/unit1": [
    {
      "title": "How an image becomes numbers",
      "points": [
        "Images are (H, W, C) tensors , and the channel axis position (last for most libraries, first for PyTorch) is a convention you must match to whatever c",
        "Bit depth sets dynamic range : 8-bit (256 levels) is fine for display, but satellite sensors use 12–16 bit (thousands of levels) to preserve subtle re",
        "Multispectral means more than RGB — Sentinel-2's 13 bands extend into near-infrared and shortwave infrared, wavelengths invisible to the eye but diagn",
        "Spatial resolution (meters/pixel) sets a hard ceiling on detectability — 10 m Sentinel-2 pixels can separate a field from a forest but not one tree fr",
        "Channel count and bit depth multiply directly into file size , which is why multiband satellite pipelines are architected around tiling rather than wh"
      ],
      "gist": "A digital image is a rectangular array of numbers, nothing more mystical than that. Each position in the array is called a pixel (short for \"picture element\"), and each pixel holds one or more numeric values describing the brightness or color measured at that location on a sensor. Everything else in computer vision — convolutions, embeddings, attention maps — is built on top of this one fact, so i"
    },
    {
      "title": "Color spaces, channels, and spectral indices",
      "points": [
        "RGB entangles brightness, hue, and saturation ; HSV and Lab untangle them for different purposes — HSV for hue/brightness-based masking, Lab for perce",
        "Vegetation stress is often invisible in RGB but visible in the red/NIR contrast, because that's the physical mechanism (chlorophyll absorption vs. cel",
        "Spectral indices are normalized differences between two bands chosen because a target material responds to them with opposite sign or magnitude — NDVI",
        "Band math beats raw bands because it cancels out shared confounders (illumination, atmosphere) that a single band can't separate from the signal of in",
        "Cloud masking needs multiple signals , not a brightness threshold — bright snow, sand, and glint all fool naive rules that only look at one channel."
      ],
      "gist": "Point an RGB composite of a farm at an agronomist and ask them to spot the drought-stressed rows before the damage is visible to the naked eye, and they can't — because by the time chlorophyll loss shows up as a color shift in red, green, and blue, the plant has already been stressed for days. RGB is a three-number summary tuned to human color perception, and human color perception was never built"
    },
    {
      "title": "Preprocessing and normalisation for vision models",
      "points": [
        "Match interpolation to data type : nearest-neighbor for categorical masks, bilinear/bicubic for continuous reflectance, and always area-average (or bl",
        "ImageNet normalisation statistics are wrong for satellite data — compute your own per-channel mean and std from your actual training tiles, especially",
        "Scale before you standardise : convert 12/16-bit digital numbers to a bounded range first, then apply z-score normalisation, not the other way around.",
        "Normalisation leakage happens when statistics are computed across train and test data together — always split first, then compute stats only from the ",
        "Huge georeferenced scenes must be tiled with overlap , not cut into abutting patches, or predictions near patch borders lose context and degrade at th"
      ],
      "gist": "Think of feeding raw satellite tiles straight into a neural network like handing a chef ingredients that arrive in wildly different units — some measured in cups, some in grams, some in whole crates — and expecting a consistent recipe to come out the other end. A model's weights are initialized assuming inputs live in some roughly predictable range; if one input channel swings from 0 to 4095 while"
    }
  ],
  "course-4-computer-vision/unit2": [
    {
      "title": "Convolution, filtering, and the frequency view",
      "points": [
        "Convolution and correlation differ only by a 180° kernel flip , and are identical for the symmetric kernels — box, Gaussian, Laplacian — that dominate",
        "Gaussian beats box smoothing because it has no hard cutoff (no ringing/false edges), is rotationally symmetric, and — unlike most smoothing shapes — i",
        "Separability turns an O(k²) 2-D convolution into two O(k) 1-D passes , a real throughput win at line-rate frame rates.",
        "Low-pass filters blur (remove high frequency = edges + noise together); high-pass filters sharpen or expose edges — a filter's behavior is readable st",
        "Boundary handling choice (zero, replicate, reflect, crop) changes pixel values near the frame edge and should be picked to avoid manufacturing false d"
      ],
      "gist": "A linear filter is a small numerical grid, called a kernel , that slides across an image and replaces each pixel with a weighted sum of its neighborhood. Formally, for an image I and kernel K of size (2k+1)×(2k+1) , the filtered output at position (x, y) is:"
    },
    {
      "title": "Edge and corner detection",
      "points": [
        "Sobel estimates directional derivatives with a built-in smoothing weight (1-2-1) , making it more noise-robust than the flat-weighted Prewitt operator",
        "Canny is a four-stage pipeline — smooth, gradient, non-max suppression, hysteresis threshold — not a single formula; skipping any stage degrades to ra",
        "Hysteresis thresholding keeps weak-but-connected edge pixels and drops weak-and-isolated ones , preserving edges that dip below a single hard threshol",
        "A Harris corner is where both eigenvalues of the local structure tensor are large — gradient strong in every direction, not just one — approximated ch",
        "Difference of Gaussians across a scale pyramid finds a blob's position and size together , the same scale-space idea SIFT reuses for scale-invariant k"
      ],
      "gist": "In 1968, Irwin Sobel and Gary Feldman described a pair of small gradient kernels for estimating edge direction and magnitude — the Sobel operator is still the first thing most vision engineers reach for today, over half a century later. In 1986, John Canny formalized what an \"optimal\" edge detector should satisfy (good detection, good localization, one response per edge) and produced the multi-sta"
    },
    {
      "title": "Feature descriptors and the classical recognition pipeline",
      "points": [
        "Pixel-difference comparison fails under any rotation or lighting shift because it has no notion of \"same physical point\" — feature matching solves exa",
        "A useful descriptor is illumination-, rotation-, and (often) scale-invariant by construction — built from local gradient orientation and relative cont",
        "SIFT's 128-d descriptor (4×4 cells × 8 orientation bins) is thorough but costly ; ORB trades float descriptors and Euclidean distance for binary strin",
        "HOG describes a whole patch's shape as a grid of gradient histograms , making it suited to template-style matching of component or defect silhouettes ",
        "RANSAC finds the geometric transform with the most agreeing matches , simultaneously rejecting bad correspondences and recovering the alignment needed"
      ],
      "gist": "A reference PCB layout sits in your inspection database as a clean, correctly-populated image captured under ideal lighting. A camera on the line just captured a board that may be rotated two or three degrees in its fixture, lit slightly warmer than the reference shot, and possibly missing a capacitor. The obvious approach — subtract the two images pixel by pixel and flag large differences — fails"
    }
  ],
  "course-4-computer-vision/unit3": [
    {
      "title": "The architectural lineage: LeNet to ResNet",
      "points": [
        "Each architecture solved one specific blocker : AlexNet solved trainability at scale (ReLU, dropout, GPUs), VGG solved \"how do I add depth systematica",
        "The degradation problem is not the same claim as vanishing gradients — it's an optimization-landscape problem where deeper plain networks get harder f",
        "A residual block learns F(x), not H(x) — reformulating the target as a correction to identity makes near-identity mappings trivially reachable.",
        "Projection shortcuts (1×1 conv) are required whenever a block changes channel count or spatial resolution — which is every stage transition in a real ",
        "These four architectures form a rough timeline of what each backbone in a modern classifier still borrows from: Inception's bottlenecks and ResNet's s"
      ],
      "gist": "In 1998, Yann LeCun's LeNet-5 read handwritten digits off bank checks using two convolutional layers, two pooling layers, and about 60,000 parameters — a network you could describe on an index card. It worked, and then for over a decade nothing much bigger worked better. Compute was scarce, datasets were small, and networks past a few layers were notoriously hard to train. The breakthrough that ch"
    },
    {
      "title": "Modern efficient architectures and design principles",
      "points": [
        "Batch norm smooths the loss landscape enough to make higher learning rates and deep networks (50+ layers) reliably trainable — it's complementary to r",
        "Depthwise-separable convolutions split spatial filtering from channel mixing , cutting parameters and FLOPs by roughly 8-9x for typical 3×3, wide-chan",
        "Squeeze-and-excitation adds per-channel attention for a few thousand parameters, letting the network reweight which channels matter per image.",
        "EfficientNet scales depth, width, and resolution together under one compound coefficient rather than tuning one dimension at a time.",
        "Double channels when you halve spatial size; use global average pooling instead of a flattened FC head — two principles that show up in nearly every p"
      ],
      "gist": "Efficiency , for a CNN, means accuracy per unit of compute and memory — measured in parameters, in floating-point operations (FLOPs), and in latency on a specific chip. A ResNet-152 answers \"how deep can we go\" well; it does not answer \"how do I run this at 10 frames per second on a solar-powered microcontroller wired to a motion sensor in a national park with no cell signal.\" That second question"
    },
    {
      "title": "Training a classifier that survives the real world",
      "points": [
        "Transfer learning works across the ImageNet-to-camera-trap gap because early convolutional layers learn domain-general edges and textures; only later ",
        "Horizontal flip is safe augmentation for wildlife; vertical flip is not — gravity orients real animals, so an upside-down training image teaches an im",
        "Mixup should be used cautiously here — blending an empty frame with a rare species produces soft labels with no real deployment analogue and can dilut",
        "Class weighting, resampling, and focal loss all attack imbalance from different angles and combine rather than substitute for each other.",
        "Whether to treat \"empty\" as a classification class or filter frames with an upstream detector is a real architectural decision , not a detail — it det"
      ],
      "gist": "Pull ten thousand images off a season's worth of camera traps and roughly eight thousand of them will show nothing but wind-blown grass, a shifting shadow, or an insect that tripped the motion sensor — the trap fired, but there's no animal in frame. Of the remaining two thousand, most will be the same handful of common species (deer, wild boar) photographed hundreds of times, while a species conse"
    }
  ],
  "course-4-computer-vision/unit4": [
    {
      "title": "From classification to localization: the detection problem",
      "points": [
        "Detection outputs a variable-length list of (class, box, score) triples per image — the core architectural challenge is making a fixed-size network em",
        "IoU is intersection area over union area; it is the yardstick for \"is this predicted box a match\" at a chosen threshold (commonly 0.5).",
        "mAP averages per-class AP , which itself summarizes the precision-recall trade-off — always inspect per-class AP separately, since a strong mean can h",
        "NMS greedily removes duplicate boxes by suppressing lower-scoring boxes that overlap a kept box past an IoU threshold.",
        "Anchors are a fixed grid of candidate boxes at multiple scales/ratios that let a fixed-size network handle a variable number of objects at variable sc"
      ],
      "gist": "Object detection is the task of producing, for an input image, a variable-length list of (class label, bounding box, confidence score) triples — one entry per object instance present. That definition is doing more work than it looks like. A classifier from Course 4 Unit 3 outputs one fixed-size vector: a softmax over C classes, always the same shape no matter what's in the image. A detector's outp"
    },
    {
      "title": "Two-stage detectors: the R-CNN family",
      "points": [
        "R-CNN (2014) ran a full CNN forward pass per region proposal (~2,000 per image) — accurate but ~47 seconds/frame, unusable for real-time perception.",
        "Fast R-CNN shares one backbone pass across all proposals and uses RoI pooling to extract a fixed-size feature slice per variable-size proposal, cuttin",
        "Faster R-CNN's Region Proposal Network replaces external selective search with a learned, anchor-based, GPU-resident proposal step, making the whole d",
        "RoI Align removes RoI pooling's coordinate-rounding error via bilinear interpolation — the fix that matters most for small, distant objects like traff",
        "Two-stage detectors trade real-time speed for accuracy, particularly on small/occluded objects — a defensible choice offline, usually not for a 30+ FP"
      ],
      "gist": "In 2014, Ross Girshick and colleagues published R-CNN (Regions with CNN features), and it was, by the standards of the time, a triumph — nearly doubling detection accuracy on PASCAL VOC over the best prior hand-engineered pipelines by doing something almost embarrassingly simple: run an off-the-shelf region-proposal algorithm called selective search over the image to guess roughly 2,000 candidate "
    },
    {
      "title": "One-stage detectors: YOLO, SSD, and the modern picture",
      "points": [
        "One-stage detectors (YOLO, SSD, RetinaNet) predict boxes, objectness, and class in a single dense forward pass over a grid — no separate proposal netw",
        "SSD's multi-scale feature maps assign small objects to early, high-resolution layers and large objects to later, low-resolution layers, directly addre",
        "Dense prediction creates severe class imbalance (background anchors vastly outnumber object anchors); focal loss down-weights easy examples so hard, r",
        "Anchor-free detectors (CenterNet, FCOS) predict centers directly instead of refining hand-tuned anchor priors; DETR reframes detection as transformer-",
        "Closing the one-stage/two-stage accuracy gap does not remove the need for redundancy — multi-camera coverage, sensor fusion, and temporal tracking — i"
      ],
      "gist": "A self-driving car's perception stack has a hard latency budget: at highway speed the vehicle covers roughly 30 meters every second, so a detector that takes 200 milliseconds to process one frame has already let the car travel six meters blind before it even finishes deciding what was in the previous frame. Faster R-CNN's two sequential learned stages — propose, then classify-and-refine — impose e"
    }
  ],
  "course-4-computer-vision/unit5": [
    {
      "title": "Semantic segmentation: dense per-pixel prediction",
      "points": [
        "Classification CNNs deliberately destroy spatial resolution through pooling and strided convolution; segmentation needs a full-resolution output, so t",
        "FCN (2015) made the output a spatial map at every layer by replacing dense classification layers with 1×1 convolutions, establishing the encoder-decod",
        "Transposed convolution can upsample but risks checkerboard artifacts when kernel size and stride don't divide evenly; bilinear-upsample-then-convolve ",
        "U-Net's skip connections concatenate high-resolution encoder features into the matching decoder stage, which is why U-Net (and its many descendants) r",
        "Dilated/atrous convolutions (DeepLab) grow the receptive field without downsampling at all, trading the recover-detail problem for a compute/memory co"
      ],
      "gist": "Semantic segmentation is the task of assigning a class label to every pixel (or, in a CT volume, every voxel) in an image: liver, kidney, tumor, or background. Where classification in Unit 3 produced one label for the whole image and detection in Unit 4 produced a handful of boxes, segmentation produces an output the same spatial size as the input, with a decision at every location. For a radiolog"
    },
    {
      "title": "Loss functions and metrics for imbalanced masks",
      "points": [
        "Pixel-wise cross-entropy and accuracy both fail silently on imbalanced masks — a model that predicts all-background can score 99%+ accuracy while bein",
        "Dice loss (1 minus the differentiable Dice coefficient) is normalized by mask size rather than total voxel count, so the rare class keeps a meaningful",
        "IoU/Jaccard from Unit 4 applies unchanged to masks ; Dice and IoU are monotonically related and usually reported together in medical segmentation pape",
        "Tversky loss generalizes Dice with separate false-positive/false-negative weights, letting you trade precision for recall when missing a lesion is cos",
        "Combined CE+Dice losses are the common production default, and rigorous evaluation reports a boundary metric (Hausdorff distance / HD95) alongside Dic"
      ],
      "gist": "A radiologist is segmenting a small hepatocellular carcinoma on an abdominal CT. The tumor occupies maybe 0.5% of the voxels in the region of interest — the rest is liver parenchyma, vessels, and background. Train a U-Net on this with ordinary pixel-wise cross-entropy and something embarrassing happens: the loss curve looks great. Training accuracy climbs past 99%. And the network has learned to p"
    },
    {
      "title": "Instance and panoptic segmentation",
      "points": [
        "Semantic segmentation labels pixels by class only; instance segmentation additionally separates individual objects of the same class (two adjacent kid",
        "Mask R-CNN extends Faster R-CNN (Unit 4) with a third, parallel mask head that predicts a small class-specific binary mask per RoI, decoupling shape p",
        "RoIAlign's bilinear-interpolated feature sampling (versus RoI pooling's coordinate rounding) was the specific fix that made per-pixel mask accuracy vi",
        "Proposal-based (Mask R-CNN) vs. proposal-free (cluster dense embeddings) instance segmentation trade mature detection machinery against better handlin",
        "3D U-Net brings the encoder-decoder shape to true volumetric data , but full-volume 3-D convolution rarely fits in GPU memory, so patch-based processi"
      ],
      "gist": "Imagine two radiology residents given the same abdominal CT and asked to describe the kidneys. The first says \"these pixels are kidney\" and colors both kidneys the same shade — that's semantic segmentation : every pixel gets a class label, full stop, and it has no concept that there are two separate kidney objects rather than one oddly-shaped one. The second resident says \"this is the left kidney,"
    }
  ],
  "course-4-computer-vision/unit6": [
    {
      "title": "The Vision Transformer",
      "points": [
        "ViT trades hand-coded priors for learned ones. CNNs bake in locality and translation equivariance via the convolution operation; ViT has neither and m",
        "Patchify is the only vision-specific step. A 16×16 patch becomes one token, flattened and linearly projected — the transformer encoder that follows is",
        "[CLS] and 2-D position embeddings replace what convolution gave for free. Since self-attention is permutation-invariant, position embeddings are the o",
        "The JFT-300M result is a data-scale threshold, not a universal win. At ImageNet-1k scale and below, a CNN generally beats a from-scratch ViT; a boutiq",
        "Hybrid stems split the difference. A small convolutional stem feeding into a transformer body recovers some locality prior and eases the data requirem"
      ],
      "gist": "Every convolutional network you've built in this course, from the earliest edge-detecting filters through ResNet's skip connections, ships with two assumptions baked into its architecture before it sees a single training image. The first is locality : a 3×3 kernel only ever looks at a pixel's immediate neighbors, so the network assumes that nearby pixels are the ones worth relating to each other. "
    },
    {
      "title": "Making ViTs practical: hierarchical and efficient variants",
      "points": [
        "Global attention over patches is quadratic in token count — the same cost problem Course 2 flagged for long sequences, worsened by the fact that highe",
        "Swin trades global attention for local-window attention plus a hierarchy , restoring linear cost and a multi-scale feature pyramid that detection and ",
        "DeiT closes ViT's data gap through distillation , not architecture — a distillation token learns from a pretrained CNN teacher, letting a ViT match CN",
        "ConvNeXt shows training recipe, not attention, explained much of ViT's reported edge — a modernized pure CNN matches transformer backbones at comparab",
        "For most real catalogues, backbone choice is a latency/data/infra decision , not an architecture-superiority question — a strong CNN and a strong ViT "
      ],
      "gist": "Global self-attention over image patches costs quadratic time and memory in the number of tokens — the same O(n²) attention cost Course 2 Unit 5 flagged for long text sequences, except images make the sequence long by default. A 224×224 image at 16×16 patches is already 196 tokens; double the resolution to catch fine handbag-hardware detail and you're at 784 tokens, pushing attention cost up by ro"
    },
    {
      "title": "Self-supervised and multimodal vision",
      "points": [
        "Contrastive SSL (SimCLR, MoCo) turns augmentation into a label , using the InfoNCE loss from Course 2 to pull together two views of one image and push",
        "MAE reconstructs masked patches like BERT reconstructs masked tokens , but needs a far higher mask ratio (about 75% vs. BERT's 15%) because images are",
        "CLIP's dual-encoder contrastive training on image-text pairs creates one shared embedding space, enabling zero-shot classification (compare an image t",
        "CLIP has a bag-of-words weakness — compositional, attribute-order queries (\"black strap, tan body\" vs. the reverse) can embed nearly identically, a re",
        "Studio-vs-user-photo distribution shift degrades zero-shot accuracy in practice — validate on real user-uploaded images, not just clean catalogue phot"
      ],
      "gist": "Every technique in the first two lessons still assumed labeled data: an ImageNet class, a bounding box, a product category typed in by a merchandiser. But a real catalogue accumulates images far faster than anyone can label them — a marketplace onboarding thousands of new sellers a day cannot hand-annotate every uploaded photo with category, attributes, and near-duplicate relationships before a mo"
    }
  ],
  "course-4-computer-vision/unit7": [
    {
      "title": "Generative modelling and GANs",
      "points": [
        "Generative vs. discriminative is a distribution question: discriminative models learn p(y|x) , generative models learn (or learn to sample from) p(x) ",
        "VAEs trade sharpness for a well-behaved latent space via the reconstruction+KL objective; their blur is a direct consequence of pixel-wise reconstruct",
        "GAN failure modes have names because they have causes: mode collapse (generator exploits a narrow trick), non-convergence (no fixed point), vanishing ",
        "WGAN-GP and spectral normalization stabilize training by controlling the discriminator's Lipschitz constant , not by changing the generator architectu",
        "StyleGAN's disentangled per-resolution latent injection is what makes \"same layout, different texture\" controllable generation possible — a capability"
      ],
      "gist": "A discriminative model answers a narrower question than people give it credit for. Every classifier in Units 1–6 — the defect detector, the segmentation U-Net, the object detector — learns p(y | x) : given this image, what's the label, mask, or box? It never has to know what a valid image looks like , only how to carve up the ones it's handed. A generative model is answering the harder, symmetric "
    },
    {
      "title": "Diffusion models",
      "points": [
        "The forward process is fixed and un-learned — only the reverse denoising process is a trained network — and the closed-form shortcut x_t = √ᾱ_t·x₀ + √",
        "Epsilon-prediction plus plain MSE is the whole training objective; it works because predicting zero-mean noise is a better-conditioned regression targ",
        "The U-Net backbone is unchanged from Unit 5 except for timestep conditioning injected into every block — the same coarse+fine fusion that served segme",
        "DDIM's non-Markovian reformulation buys a 20-50x sampling speedup over DDPM by skipping steps, but diffusion is still far slower per image than a GAN'",
        "Latent diffusion moves the entire denoising loop into a compressed VAE latent space , which is the difference between \"runs on a data-center cluster\" "
      ],
      "gist": "Picture a sculptor who starts not with marble but with a block of pure static — visual noise with no structure at all — and works backward, one small correction at a time, coaxing a recognizable form out of the mess. Nudge the noise slightly toward \"less noisy,\" repeat a few hundred times, and a coherent image emerges at the end. That is, almost literally, how a diffusion model generates an image,"
    },
    {
      "title": "Conditioning, control, and the honest limits",
      "points": [
        "Cross-attention conditions on open-ended text; ControlNet/inpainting/img2img condition on pixel-precise structure — text alone can't specify an exact ",
        "Synthetic training data can teach a classifier generator fingerprints instead of the real signal — a domain gap that inflates validation accuracy on s",
        "FID and Inception Score are widely reported and widely flawed — a Gaussian approximation, sensitivity to the scoring network, and no ability to detect",
        "Precision-recall for generative models separates realism from coverage , giving a way to name mode collapse (low recall) as distinct from poor sample ",
        "Watermarking, provenance metadata, and detection are each partial and each defeatable ; deepfake detection specifically is a genuine arms race that im"
      ],
      "gist": "Two people want two very different things from the same generator, and neither wants \"any plausible image.\" A designer at a furniture brand needs a photoreal render of this exact armchair , in walnut, on a specific studio backdrop, not a generic armchair the model invented. A machine-learning engineer building a defect classifier for weld inspection needs synthetic images of the rare defect class "
    }
  ],
  "course-4-computer-vision/unit8": [
    {
      "title": "Transfer learning and data strategy in production vision",
      "points": [
        "Backbone choice sets your data budget. A self-supervised, domain-pretrained backbone needs roughly a third to a half as many labels as an ImageNet bac",
        "Freeze early, unfreeze as labels accumulate. Full fine-tuning on a few hundred examples overfits to a two-day snapshot of an empty store; unfreeze pro",
        "Active learning spends human labelling time on the frames that move the model — highest-uncertainty crops, not random sampling — and always folds labe",
        "Synthetic data fills the long tail but should stay a minority share of any class's training examples to avoid overfitting to rendering artifacts.",
        "Decouple embeddings from classification so new SKUs are index insertions, not full retrains — reserve full retraining for scheduled cadence, not every"
      ],
      "gist": "A regional grocery chain signs a contract for checkout-free shelves in a brand-new store format: taller gondolas, denser SKU packing, a completely different lighting rig than the flagship stores your model was trained on. The store opens in six weeks. There are 2,000 SKUs on the planogram, roughly 140 of them are new products with zero photographs anywhere in your training set, and the vendor who "
    },
    {
      "title": "Deployment: edge, cloud, latency, and optimization",
      "points": [
        "Edge is forced, not chosen for its own sake: bandwidth limits, sub-second latency requirements, and minimizing raw video leaving the premises all poin",
        "Quantization, pruning, and distillation compound — distill to a smaller architecture, structurally prune it, then quantize to INT8 — each attacking si",
        "Video is temporal, not a pile of independent frames; tracking across frames lets a cheaper model reach reliability a bigger single-frame model would n",
        "Batching trades latency for throughput — bigger batches cut per-frame compute overhead but add queuing delay, so batch size is a tunable knob, not a d",
        "Drift is physical in this domain — a re-lit aisle or a redesigned package silently shifts the input distribution — so monitor confidence and input sta"
      ],
      "gist": "Edge deployment means running inference on compute physically located where the data is generated — in this system, a small compute module bolted to the ceiling near each camera cluster — rather than shipping every frame to a data center and waiting for a response. Cloud deployment means the inverse: centralized, elastic compute that trades a network round trip for far more capacity per model. A c"
    },
    {
      "title": "End-to-end systems, pipelines, and responsibility",
      "points": [
        "The pipeline is a chain of stations, not one model — ingest, detect, track, re-identify, aggregate, feed back — and each handoff has its own failure m",
        "Vision and language fuse in two concrete places: OCR-plus-text-classification to disambiguate near-identical packaging, and RAG-style natural-language",
        "Shadow deployment and A/B rollout, never a direct swap — a new model proves itself on live traffic before it can affect a single customer's bill.",
        "Fairness has to be measured per-subgroup , not just in aggregate — detection and re-identification error rates can and do diverge across demographics,",
        "Data minimization and purpose limitation are design decisions, not policy afterthoughts: ephemeral raw video, persistent anonymized events only, and a"
      ],
      "gist": "Think of the whole checkout-free system the way you'd think of an assembly line rather than a single clever machine: no single station is impressive on its own, but the line only works if every station hands its output to the next in a format the next station can actually use, and if a bad part anywhere on the line gets flagged before it reaches the customer rather than after. A detector that find"
    }
  ]
};

/** Every question in a unit, across its three lessons. */
export function unitPool(lessonId: string): QuizQuestion[] {
  return [1, 2, 3].flatMap((n) => lessonBank[`${lessonId}#lesson-${n}`] ?? []);
}

/**
 * Boss set: a spread across all three lessons rather than the whole pool, so a
 * fight is ten questions and not twenty-four — and it still opens on the
 * easier end before ramping up.
 */
export function bossSet(lessonId: string, size = 10): QuizQuestion[] {
  const perLesson = [1, 2, 3].map((n) => lessonBank[`${lessonId}#lesson-${n}`] ?? []);
  const out: QuizQuestion[] = [];
  for (let round = 0; out.length < size; round++) {
    let added = false;
    for (const bank of perLesson) {
      if (round < bank.length && out.length < size) {
        out.push(bank[round]);
        added = true;
      }
    }
    if (!added) break;
  }
  const rank = { easy: 0, medium: 1, hard: 2 } as const;
  return out.sort((a, b) => rank[a.difficulty] - rank[b.difficulty]);
}
