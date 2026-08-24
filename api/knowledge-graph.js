import graphData from './knowledge-graph.json' assert { type: 'json' }

/**
 * Cayley-inspired Graph Traversal & Entity Resolver
 * Resolves Subject-Predicate-Object triples and entity nodes with zero network latency.
 */
export function queryKnowledgeGraph(query = '') {
  const normalized = query.toLowerCase()
  const relevantEntities = []
  const relevantTriples = []

  // Check entity triggers
  const entityKeywords = {
    executive_ai_enablement: ['enablement', 'blueprint', 'e & f', 'grade', 'executives', '2500', '2,500', 'prototypes', '94', 'vps', 'directors', 'train-the-trainer', 'ttt', 'studio', 'vibe coding', 'trainer', 'scale'],
    candidate_evaluation_ecosystem: ['evaluation', 'bench', 'fresher', 'lateral', 'voice interview', 'voice', 'assessment', 'adaptive', 'mcq', 'savings', '117', '60 days', '5%'],
    global_pmo_control_tower: ['pmo', 'control tower', 'chief of staff', 'transformation', 'programs', 'matrix', 'account matrix', 'governance', 'coo', 'evp'],
    bschool_talent_redesign: ['b-school', 'management trainee', 'trainee', 'billability', 'attrition', 'intake', 'mba'],
    theatrical_distribution_platform: ['sony', 'universal', 'theatrical', 'distribution', 'hollywood', 'saas', 'ba', 'business analyst'],
    reelswipe_mobile_app: ['reelswipe', 'nab', 'mobile app'],
    etap_na_architect_office: ['etap', 'super team', 'whitepapers', 'blogs', 'pitch your view'],
    baker_hughes_iiot: ['baker hughes', 'iiot', 'iot', 'scrum master'],
    routingmagic: ['routingmagic', 'terminal', 'router', 'multi-model'],
    investogram: ['investogram', 'financial', 'knowledge graph', 'capital shield', 'risk engine'],
  }

  for (const [entityId, keywords] of Object.entries(entityKeywords)) {
    if (keywords.some(k => normalized.includes(k))) {
      const entity = graphData.entities[entityId]
      if (entity) {
        relevantEntities.push(entity)
        // Find matching triples
        const triples = graphData.triples.filter(t => t.subject === entityId || t.object === entityId)
        relevantTriples.push(...triples)
      }
    }
  }

  // Always include primary profile facts
  const primaryTriples = graphData.triples.filter(t => t.subject === 'prakhar_mishra')

  return {
    entities: relevantEntities.length > 0 ? relevantEntities : Object.values(graphData.entities).slice(0, 3),
    triples: relevantTriples.length > 0 ? [...new Set([...relevantTriples, ...primaryTriples.slice(0, 6)])] : primaryTriples,
    formatAsContext() {
      const entitySummary = this.entities.map(e => `[ENTITY: ${e.name} (${e.type})] -> ${JSON.stringify(e)}`).join('\n')
      const triplesSummary = this.triples.map(t => `(${t.subject}) --[${t.predicate}]--> "${t.object}"`).join('\n')
      return `### KNOWLEDGE GRAPH GROUND TRUTH (VERIFIED FACTS — ZERO HALLUCINATIONS):\n${entitySummary}\n\n### GRAPH TRIPLES (RDF):\n${triplesSummary}`
    }
  }
}
