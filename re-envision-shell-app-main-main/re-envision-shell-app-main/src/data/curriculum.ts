// The ReEnvision curriculum: 4 courses, 32 units, 96 lessons.
//
// Generated from the unit pages in public/curriculum/. Each unit's `href`
// points at a self-contained HTML page (lessons, code, and a quiz with
// toggleable answers) that LessonScreen loads directly — no build step and
// no bundler plugin, since Vite copies public/ through untouched.
export interface CourseUnit {
  id: string;
  title: string;
  lessonTitle: string;
  lessonDetail: string;
  lessonId: string;
  status: 'completed' | 'active' | 'upcoming';
  lessons: string[];
  quizCount: number;
  href: string;
}

export interface Course {
  id: string;
  name: string;
  accent: string;
  units: CourseUnit[];
}

export const courses: Course[] = [
  {
    id: 'course-1',
    name: 'Course 1: Deep Learning Foundations',
    accent: 'from-blue-500 to-cyan-500',
    units: [
      {
        id: 'c1-u1',
        title: 'Unit 1 — Neural network foundations',
        lessonTitle: 'Lesson 1 • The perceptron and the linear decision boundary',
        lessonDetail: 'Before you can train anything, you need to know what a network actually computes. This unit builds that vocabulary from the single perceptron up through a multi-layer network, using clinical screening data — cell-nucleus measurements and lab panels — as the running example throughout.',
        lessonId: 'course-1-deep-learning/unit1',
        status: 'completed',
        lessons: [
          'The perceptron and the linear decision boundary',
          'Activation functions and why nonlinearity is the whole point',
          'Layers, width, and depth: stacking into a network'
        ],
        quizCount: 7,
        href: '/curriculum/course-1-deep-learning/unit1.html'
      },
      {
        id: 'c1-u2',
        title: 'Unit 2 — Forward propagation and loss functions',
        lessonTitle: 'Lesson 1 • The forward pass as composed matrix operations',
        lessonDetail: 'You already know a single perceptron and how layers stack. Now you run a whole batch of hourly electricity readings through a network at once, turn its predictions into one number that says "how wrong," and see what that number can and can\'t tell you before we touch a single gradient.',
        lessonId: 'course-1-deep-learning/unit2',
        status: 'active',
        lessons: [
          'The forward pass as composed matrix operations',
          'Loss functions: turning a prediction into one number',
          'From per-sample loss to a training objective'
        ],
        quizCount: 7,
        href: '/curriculum/course-1-deep-learning/unit2.html'
      },
      {
        id: 'c1-u3',
        title: 'Unit 3 — Backpropagation and gradient descent',
        lessonTitle: 'Lesson 1 • The chain rule on a computational graph',
        lessonDetail: 'The forward pass from Units 1–2 turns a scanned ZIP-code digit into a probability distribution over ten classes. This unit derives how the network learns from its mistakes — the chain rule that assigns blame to every weight, and the update rule that nudges each one toward a better sort.',
        lessonId: 'course-1-deep-learning/unit3',
        status: 'upcoming',
        lessons: [
          'The chain rule on a computational graph',
          'Backprop through a two-layer network, by hand',
          'Gradient descent: batch, stochastic, and mini-batch'
        ],
        quizCount: 8,
        href: '/curriculum/course-1-deep-learning/unit3.html'
      },
      {
        id: 'c1-u4',
        title: 'Unit 4 — Optimization algorithms',
        lessonTitle: 'Lesson 1 • Momentum: why plain SGD stalls in ravines',
        lessonDetail: 'You already have a working update rule from Unit 3 — plain SGD. This unit is about what breaks when the loss surface isn\'t a nice round bowl, and the three families of fixes that show up in every serious training run: momentum, adaptive per-parameter scaling, and learning rate schedules.',
        lessonId: 'course-1-deep-learning/unit4',
        status: 'upcoming',
        lessons: [
          'Momentum: why plain SGD stalls in ravines',
          'Adaptive methods: AdaGrad, RMSProp, Adam, AdamW',
          'Learning rate schedules and how to choose one'
        ],
        quizCount: 8,
        href: '/curriculum/course-1-deep-learning/unit4.html'
      },
      {
        id: 'c1-u5',
        title: 'Unit 5 — Regularization techniques',
        lessonTitle: 'Lesson 1 • Diagnosing overfitting, and controlling capacity with weight penalties',
        lessonDetail: 'Your credit-default model is memorizing the training vintage, not learning delinquency risk. This unit covers the tools that keep capacity in check — weight penalties, dropout, augmentation, label smoothing, normalization, and early stopping — all worked through on the same 90-day-delinquency model.',
        lessonId: 'course-1-deep-learning/unit5',
        status: 'upcoming',
        lessons: [
          'Diagnosing overfitting, and controlling capacity with weight penalties',
          'Dropout, augmentation, and label smoothing',
          'Normalization layers and early stopping'
        ],
        quizCount: 8,
        href: '/curriculum/course-1-deep-learning/unit5.html'
      },
      {
        id: 'c1-u6',
        title: 'Unit 6 — Convolutional neural networks: the basics',
        lessonTitle: 'Lesson 1 • Convolution as local connectivity and weight sharing',
        lessonDetail: 'Dense layers can\'t scale to real images and can\'t recognize a pattern that moves. This unit builds the convolution operation from scratch, works out the arithmetic of shapes and receptive fields, and assembles those pieces into a working leaf-disease classifier.',
        lessonId: 'course-1-deep-learning/unit6',
        status: 'upcoming',
        lessons: [
          'Convolution as local connectivity and weight sharing',
          'Padding, stride, pooling, and receptive fields',
          'Assembling a working CNN'
        ],
        quizCount: 8,
        href: '/curriculum/course-1-deep-learning/unit6.html'
      },
      {
        id: 'c1-u7',
        title: 'Unit 7 — Recurrent networks and sequence modeling',
        lessonTitle: 'Lesson 1 • Recurrence and backpropagation through time',
        lessonDetail: 'The ICU vitals stream that opened this course as a static feature vector is really a sequence with a clock attached. This unit builds the machinery — recurrence, gates, masking — that respects the clock instead of pretending it isn\'t there.',
        lessonId: 'course-1-deep-learning/unit7',
        status: 'upcoming',
        lessons: [
          'Recurrence and backpropagation through time',
          'Gated cells: LSTM and GRU',
          'Making sequence models work in practice'
        ],
        quizCount: 8,
        href: '/curriculum/course-1-deep-learning/unit7.html'
      },
      {
        id: 'c1-u8',
        title: 'Unit 8 — Training deep networks in practice',
        lessonTitle: 'Lesson 1 • A debugging methodology that actually finds the bug',
        lessonDetail: 'The capstone: everything from Units 1–7 — losses, initialization, optimizers, regularization, convolutions, sequence models, and architecture choices — has to survive contact with a real cluster, a real budget, and a job queue measured in GPU-hours. This unit is about not wasting them.',
        lessonId: 'course-1-deep-learning/unit8',
        status: 'upcoming',
        lessons: [
          'A debugging methodology that actually finds the bug',
          'Hyperparameter tuning on a real budget',
          'Hardware, memory, and throughput'
        ],
        quizCount: 8,
        href: '/curriculum/course-1-deep-learning/unit8.html'
      }
    ]
  },
  {
    id: 'course-2',
    name: 'Course 2: Foundational Models',
    accent: 'from-violet-500 to-fuchsia-500',
    units: [
      {
        id: 'c2-u1',
        title: 'Unit 1 — Foundation models and the pretrain-then-adapt paradigm',
        lessonTitle: 'Lesson 1 • What makes a model "foundational"',
        lessonDetail: 'Why the field stopped training one model per task and started training one backbone for everything — and what that backbone has to look like to earn the name "foundational." Every example here runs on protein sequences: UniRef, the ESM lineage, and structure prediction as the task that made it obvious the approach worked.',
        lessonId: 'course-2-foundational-models/unit1',
        status: 'completed',
        lessons: [
          'What makes a model "foundational"',
          'The pretrain-then-adapt pipeline',
          'Self-supervision: where labels come from when there are none'
        ],
        quizCount: 8,
        href: '/curriculum/course-2-foundational-models/unit1.html'
      },
      {
        id: 'c2-u2',
        title: 'Unit 2 — The transformer architecture, in detail',
        lessonTitle: 'Lesson 1 • Self-attention from first principles',
        lessonDetail: 'Attention replaced recurrence by turning "read the sequence in order" into "look up whatever\'s relevant, regardless of distance." This unit derives that mechanism from scratch — query/key/value, multi-head, position, masking — using 40–400 clause commercial contracts as the running example, because contract cross-referencing is exactly the long-range dependency problem attention was built to solve.',
        lessonId: 'course-2-foundational-models/unit2',
        status: 'active',
        lessons: [
          'Self-attention from first principles',
          'Multi-head attention and the full transformer block',
          'Position, masking, and the three architecture families'
        ],
        quizCount: 8,
        href: '/curriculum/course-2-foundational-models/unit2.html'
      },
      {
        id: 'c2-u3',
        title: 'Unit 3 — Tokenization and embeddings',
        lessonTitle: 'Lesson 1 • Why splitting text is harder than it looks',
        lessonDetail: 'Before any attention block in Unit 2 can run, raw text has to become a sequence of integers, and those integers have to become vectors. This unit covers how that split happens and what it costs — using a multilingual product catalogue as the proving ground.',
        lessonId: 'course-2-foundational-models/unit3',
        status: 'upcoming',
        lessons: [
          'Why splitting text is harder than it looks',
          'BPE, WordPiece, Unigram, SentencePiece',
          'Embeddings: from token id to vector'
        ],
        quizCount: 8,
        href: '/curriculum/course-2-foundational-models/unit3.html'
      },
      {
        id: 'c2-u4',
        title: 'Unit 4 — Pretraining objectives',
        lessonTitle: 'Lesson 1 • Causal language modelling',
        lessonDetail: 'The architecture from Units 1–3 is inert until you decide what it is trying to predict. This unit covers the three families of pretraining objective — causal, masked/denoising, and contrastive — through the lens of building a model over public source code: completion, infilling, and docstring-to-function search.',
        lessonId: 'course-2-foundational-models/unit4',
        status: 'upcoming',
        lessons: [
          'Causal language modelling',
          'Masked language modelling and denoising',
          'Contrastive objectives'
        ],
        quizCount: 7,
        href: '/curriculum/course-2-foundational-models/unit4.html'
      },
      {
        id: 'c2-u5',
        title: 'Unit 5 — Scaling laws and architecture design',
        lessonTitle: 'Lesson 1 • Scaling laws',
        lessonDetail: 'How to spend a fixed FLOP budget on parameters versus data, why a million-cell weather grid breaks naive attention, and how Mixture of Experts buys capacity without buying proportional compute — worked through a global 0.25-degree atmospheric emulator, in the lineage of GraphCast, Pangu-Weather, and FourCastNet.',
        lessonId: 'course-2-foundational-models/unit5',
        status: 'upcoming',
        lessons: [
          'Scaling laws',
          'Depth, width, context length, and the attention bottleneck',
          'Mixture of Experts'
        ],
        quizCount: 8,
        href: '/curriculum/course-2-foundational-models/unit5.html'
      },
      {
        id: 'c2-u6',
        title: 'Unit 6 — Fine-tuning and transfer learning',
        lessonTitle: 'Lesson 1 • What transfers, and what doesn\'t',
        lessonDetail: 'You have 12,000 labelled chest CT and X-ray report impressions and a language model that has barely seen the word "pneumothorax." This unit is about the mechanics of closing that gap — what a pretrained model already knows, what a fine-tune can and cannot fix, and how to run the adaptation so it holds up on a patient it has never seen.',
        lessonId: 'course-2-foundational-models/unit6',
        status: 'upcoming',
        lessons: [
          'What transfers, and what doesn\'t',
          'Running a fine-tune that actually works',
          'Domain-adaptive pretraining and data efficiency'
        ],
        quizCount: 7,
        href: '/curriculum/course-2-foundational-models/unit6.html'
      },
      {
        id: 'c2-u7',
        title: 'Unit 7 — Parameter-efficient fine-tuning and instruction tuning',
        lessonTitle: 'Lesson 1 • Why full fine-tuning does not scale to 40 tenants',
        lessonDetail: 'One 7B base model, 40 telecom enterprise tenants, one shared GPU budget, and a hard requirement that no tenant\'s data or weights leak into another\'s. This unit builds the machinery — LoRA, QLoRA, and the instruction-tuning pipeline — that makes that deployment possible at all.',
        lessonId: 'course-2-foundational-models/unit7',
        status: 'upcoming',
        lessons: [
          'Why full fine-tuning does not scale to 40 tenants',
          'LoRA and the PEFT family',
          'Instruction tuning'
        ],
        quizCount: 8,
        href: '/curriculum/course-2-foundational-models/unit7.html'
      },
      {
        id: 'c2-u8',
        title: 'Unit 8 — Evaluation, alignment, and deployment',
        lessonTitle: 'Lesson 1 • Evaluation that isn\'t theater',
        lessonDetail: 'The capstone unit: how to tell whether a model is actually good enough to hand a claimant a legally consequential answer, how it got aligned to give that kind of answer in the first place, and what it costs — in latency, dollars, and operational discipline — to run it in production.',
        lessonId: 'course-2-foundational-models/unit8',
        status: 'upcoming',
        lessons: [
          'Evaluation that isn\'t theater',
          'Alignment: RLHF, RLAIF, and the direct alternatives',
          'Deployment: latency, cost, and guardrails'
        ],
        quizCount: 8,
        href: '/curriculum/course-2-foundational-models/unit8.html'
      }
    ]
  },
  {
    id: 'course-3',
    name: 'Course 3: Text Processing (NLP)',
    accent: 'from-emerald-500 to-teal-500',
    units: [
      {
        id: 'c3-u1',
        title: 'Unit 1 — Text preprocessing and tokenization fundamentals',
        lessonTitle: 'Lesson 1 • The preprocessing pipeline',
        lessonDetail: 'Before any moderation model sees a post, someone decides what "the text" even is — and every one of those decisions throws away information. This unit re-grounds preprocessing and tokenization from scratch, using the messiest text on the internet: raw social posts.',
        lessonId: 'course-3-text-processing/unit1',
        status: 'completed',
        lessons: [
          'The preprocessing pipeline',
          'Tokenization: word, subword, character',
          'Stemming, lemmatization, stopwords, and the classical normalisation stack'
        ],
        quizCount: 8,
        href: '/curriculum/course-3-text-processing/unit1.html'
      },
      {
        id: 'c3-u2',
        title: 'Unit 2 — Classical NLP: Bag-of-Words, TF-IDF, n-grams',
        lessonTitle: 'Lesson 1 • The Bag-of-Words model',
        lessonDetail: 'Before embeddings and transformers, search engines and classifiers ran on counting words. This unit builds the vector-space toolkit — bag-of-words, TF-IDF weighting, and n-grams — using a corpus of case law and statutes as the running example, and shows exactly where counting words stops working.',
        lessonId: 'course-3-text-processing/unit2',
        status: 'active',
        lessons: [
          'The Bag-of-Words model',
          'TF-IDF: weighting words by informativeness',
          'N-grams and the sparsity wall'
        ],
        quizCount: 8,
        href: '/curriculum/course-3-text-processing/unit2.html'
      },
      {
        id: 'c3-u3',
        title: 'Unit 3 — Word embeddings and semantic similarity',
        lessonTitle: 'Lesson 1 • The distributional hypothesis and dense vectors',
        lessonDetail: 'TF-IDF gave every word its own dimension and no way to say two different words mean related things. This unit replaces those sparse counts with dense vectors that put "JavaScript" and "ECMAScript" near each other in space — the representation that makes semantic resume-to-job matching possible.',
        lessonId: 'course-3-text-processing/unit3',
        status: 'upcoming',
        lessons: [
          'The distributional hypothesis and dense vectors',
          'Word2vec and GloVe: how the vectors are learned',
          'Limits: polysemy, bias, and OOV'
        ],
        quizCount: 8,
        href: '/curriculum/course-3-text-processing/unit3.html'
      },
      {
        id: 'c3-u4',
        title: 'Unit 4 — Language modeling with RNNs and LSTMs',
        lessonTitle: 'Lesson 1 • Neural language modelling',
        lessonDetail: 'The n-gram model from Unit 2 memorizes contexts; a phone keyboard needs one that generalizes to contexts it has never seen. This unit builds a neural language model on the LSTM cell from Course 1 Unit 7, tunes it for the brutal latency and memory budget of on-device autocomplete, and ships it as a streaming predictor that updates one keystroke at a time.',
        lessonId: 'course-3-text-processing/unit4',
        status: 'upcoming',
        lessons: [
          'Neural language modelling',
          'Making it work: perplexity, tied weights, and the softmax bottleneck',
          'Deploying an on-device LSTM'
        ],
        quizCount: 8,
        href: '/curriculum/course-3-text-processing/unit4.html'
      },
      {
        id: 'c3-u5',
        title: 'Unit 5 — Transformer-based NLP applied: BERT vs GPT',
        lessonTitle: 'Lesson 1 • Two families from one architecture',
        lessonDetail: 'Same attention mechanism, opposite jobs: BERT reads a headline in every direction at once to classify it; GPT reads left-to-right to write one. This unit puts both to work on financial-news intelligence — sentiment, ticker extraction, and analyst summaries — and asks which family actually fits each task.',
        lessonId: 'course-3-text-processing/unit5',
        status: 'upcoming',
        lessons: [
          'Two families from one architecture',
          'Applying BERT: fine-tuning for understanding tasks',
          'Applying GPT: prompting, in-context learning, and when to fine-tune'
        ],
        quizCount: 8,
        href: '/curriculum/course-3-text-processing/unit5.html'
      },
      {
        id: 'c3-u6',
        title: 'Unit 6 — Named entity recognition and text classification',
        lessonTitle: 'Lesson 1 • Sequence labelling and tagging schemes',
        lessonDetail: 'Pulling drugs, dosages, diagnoses, and adverse events out of raw clinical notes, and routing those notes to the right specialty queue — where a missed entity or a misleading accuracy score has real clinical cost.',
        lessonId: 'course-3-text-processing/unit6',
        status: 'upcoming',
        lessons: [
          'Sequence labelling and tagging schemes',
          'Models for NER: from CRF to BERT',
          'Text classification and evaluation done right'
        ],
        quizCount: 7,
        href: '/curriculum/course-3-text-processing/unit6.html'
      },
      {
        id: 'c3-u7',
        title: 'Unit 7 — Sequence-to-sequence: machine translation and summarization',
        lessonTitle: 'Lesson 1 • The encoder-decoder framework and decoding',
        lessonDetail: 'Encoder-decoder models turn one sequence into another — a Haitian Creole field report into English, a stack of incident reports into a one-paragraph briefing. This unit covers how they decode, how (and how badly) we measure whether they got it right, and what breaks when the language is low-resource and the stakes are a rescue team\'s next move.',
        lessonId: 'course-3-text-processing/unit7',
        status: 'upcoming',
        lessons: [
          'The encoder-decoder framework and decoding',
          'Evaluation and the faithfulness problem',
          'Low-resource and production realities'
        ],
        quizCount: 8,
        href: '/curriculum/course-3-text-processing/unit7.html'
      },
      {
        id: 'c3-u8',
        title: 'Unit 8 — Building NLP applications: sentiment, chatbots, and RAG',
        lessonTitle: 'Lesson 1 • Sentiment and aspect-based opinion mining',
        lessonDetail: 'The capstone unit: turn tokenizers, embeddings, and transformers from Units 1–7 into three production systems — aspect-level opinion mining, a task-oriented conversational assistant, and a retrieval-augmented generator that answers from a company\'s own documents instead of its own memorized guesses.',
        lessonId: 'course-3-text-processing/unit8',
        status: 'upcoming',
        lessons: [
          'Sentiment and aspect-based opinion mining',
          'Conversational systems',
          'Retrieval-augmented generation'
        ],
        quizCount: 8,
        href: '/curriculum/course-3-text-processing/unit8.html'
      }
    ]
  },
  {
    id: 'course-4',
    name: 'Course 4: Computer Vision',
    accent: 'from-amber-500 to-orange-500',
    units: [
      {
        id: 'c4-u1',
        title: 'Unit 1 — Image representation and preprocessing fundamentals',
        lessonTitle: 'Lesson 1 • How an image becomes numbers',
        lessonDetail: 'Before any model can look at a picture, that picture has to become a grid of numbers a computer can add and multiply. This unit re-grounds vision from scratch, using satellite imagery — where the numbers go far past red, green, and blue — to build the vocabulary and pipeline every later unit depends on.',
        lessonId: 'course-4-computer-vision/unit1',
        status: 'completed',
        lessons: [
          'How an image becomes numbers',
          'Color spaces, channels, and spectral indices',
          'Preprocessing and normalisation for vision models'
        ],
        quizCount: 7,
        href: '/curriculum/course-4-computer-vision/unit1.html'
      },
      {
        id: 'c4-u2',
        title: 'Unit 2 — Classical computer vision: edges, filters, features',
        lessonTitle: 'Lesson 1 • Convolution, filtering, and the frequency view',
        lessonDetail: 'Before a single neural net enters the picture, decades of hand-designed operators already solve most of what a production line needs: convolutional filters that clean up sensor noise, gradient operators that find edges, and descriptors that recognize a part despite rotation and lighting drift. This unit builds that toolbox on inspection imagery.',
        lessonId: 'course-4-computer-vision/unit2',
        status: 'active',
        lessons: [
          'Convolution, filtering, and the frequency view',
          'Edge and corner detection',
          'Feature descriptors and the classical recognition pipeline'
        ],
        quizCount: 8,
        href: '/curriculum/course-4-computer-vision/unit2.html'
      },
      {
        id: 'c4-u3',
        title: 'Unit 3 — CNN architectures for image classification',
        lessonTitle: 'Lesson 1 • The architectural lineage: LeNet to ResNet',
        lessonDetail: 'From LeNet\'s five layers to ResNet\'s hundreds, and from residual blocks to the mobile-friendly designs that let a species classifier run on the low-power chip bolted inside a camera trap. You\'ll build, cost out, and train the backbone this course keeps coming back to.',
        lessonId: 'course-4-computer-vision/unit3',
        status: 'upcoming',
        lessons: [
          'The architectural lineage: LeNet to ResNet',
          'Modern efficient architectures and design principles',
          'Training a classifier that survives the real world'
        ],
        quizCount: 8,
        href: '/curriculum/course-4-computer-vision/unit3.html'
      },
      {
        id: 'c4-u4',
        title: 'Unit 4 — Object detection fundamentals',
        lessonTitle: 'Lesson 1 • From classification to localization: the detection problem',
        lessonDetail: 'Your Unit 3 classifier can tell you a picture contains a truck. A self-driving car needs to know where the truck is, where the pedestrian half-hidden behind it is, and how many other things share the frame — this unit is where "what" becomes "what, and exactly where, and how many."',
        lessonId: 'course-4-computer-vision/unit4',
        status: 'upcoming',
        lessons: [
          'From classification to localization: the detection problem',
          'Two-stage detectors: the R-CNN family',
          'One-stage detectors: YOLO, SSD, and the modern picture'
        ],
        quizCount: 8,
        href: '/curriculum/course-4-computer-vision/unit4.html'
      },
      {
        id: 'c4-u5',
        title: 'Unit 5 — Image segmentation: semantic and instance',
        lessonTitle: 'Lesson 1 • Semantic segmentation: dense per-pixel prediction',
        lessonDetail: 'Detection draws a box around a tumor; segmentation traces its edge, voxel by voxel. This unit builds the encoder-decoder architectures, loss functions, and instance-level extensions that make pixel-accurate delineation possible in CT and MRI volumes — where a few millimeters of boundary error can change a surgical margin.',
        lessonId: 'course-4-computer-vision/unit5',
        status: 'upcoming',
        lessons: [
          'Semantic segmentation: dense per-pixel prediction',
          'Loss functions and metrics for imbalanced masks',
          'Instance and panoptic segmentation'
        ],
        quizCount: 8,
        href: '/curriculum/course-4-computer-vision/unit5.html'
      },
      {
        id: 'c4-u6',
        title: 'Unit 6 — Vision transformers and modern architectures',
        lessonTitle: 'Lesson 1 • The Vision Transformer',
        lessonDetail: 'The CNN\'s convolutional priors gave way, at catalogue scale, to a model that learns spatial structure from data alone. This unit covers the Vision Transformer, the hierarchical and efficient variants that made it deployable, and the self-supervised and multimodal training regimes — SimCLR, MAE, CLIP — that let a single embedding space power classification, retrieval, and zero-shot visual search across a product catalogue.',
        lessonId: 'course-4-computer-vision/unit6',
        status: 'upcoming',
        lessons: [
          'The Vision Transformer',
          'Making ViTs practical: hierarchical and efficient variants',
          'Self-supervised and multimodal vision'
        ],
        quizCount: 8,
        href: '/curriculum/course-4-computer-vision/unit6.html'
      },
      {
        id: 'c4-u7',
        title: 'Unit 7 — Generative vision models: GANs and diffusion',
        lessonTitle: 'Lesson 1 • Generative modelling and GANs',
        lessonDetail: 'You\'ve spent six units teaching networks to look at images and say what\'s there. This unit flips the arrow: networks that produce images — for design mockups, for synthetic training data when the real examples are too rare or too risky to collect, and for the deepfake problem that inevitably rides along with any technology this good.',
        lessonId: 'course-4-computer-vision/unit7',
        status: 'upcoming',
        lessons: [
          'Generative modelling and GANs',
          'Diffusion models',
          'Conditioning, control, and the honest limits'
        ],
        quizCount: 8,
        href: '/curriculum/course-4-computer-vision/unit7.html'
      },
      {
        id: 'c4-u8',
        title: 'Unit 8 — Building computer vision applications: transfer, deployment, pipelines',
        lessonTitle: 'Lesson 1 • Transfer learning and data strategy in production vision',
        lessonDetail: 'The capstone unit: how a shelf-recognition and checkout-free tracking system actually ships — from a cold-start data problem, through edge deployment under real latency and power budgets, to a full pipeline with monitoring, multimodal fusion, and the responsibility layer that governs it.',
        lessonId: 'course-4-computer-vision/unit8',
        status: 'upcoming',
        lessons: [
          'Transfer learning and data strategy in production vision',
          'Deployment: edge, cloud, latency, and optimization',
          'End-to-end systems, pipelines, and responsibility'
        ],
        quizCount: 8,
        href: '/curriculum/course-4-computer-vision/unit8.html'
      }
    ]
  }
];

/** Look up a unit by the lessonId used for navigation. */
export function findUnit(lessonId?: string): CourseUnit | undefined {
  if (!lessonId) return undefined;
  for (const course of courses) {
    const unit = course.units.find((u) => u.lessonId === lessonId);
    if (unit) return unit;
  }
  return undefined;
}
