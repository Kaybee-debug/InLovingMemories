<script setup lang="ts">
const { content } = useMemorialContent()
const familyTree = computed(() => content.value.family)

useSeoMeta({ title: 'Family Tree — In Loving Memory' })
</script>

<template>
  <div class="page">
    <div class="container">
      <PageHero
        eyebrow="Roots & Branches"
        title="Family Tree"
        lede="The living legacy of his love."
      />

      <div class="tree fade-up-delay">
        <div class="row">
          <FamilyNode
            v-for="person in familyTree.grandparents"
            :key="person.name"
            :name="person.name"
            :role="person.role"
          />
        </div>

        <div class="connector" aria-hidden="true" />

        <div class="center">
          <FamilyNode
            :name="familyTree.center.name"
            :role="familyTree.center.years"
            accent
          />
          <p class="married">{{ familyTree.center.married }}</p>
          <FamilyNode
            :name="familyTree.wife.name"
            :role="familyTree.wife.role"
          />
        </div>

        <div class="connector" aria-hidden="true" />

        <div class="row">
          <FamilyNode
            v-for="person in familyTree.children"
            :key="person.name"
            :name="person.name"
            :role="person.role"
          />
        </div>

        <template v-if="familyTree.grandchildren.length">
          <div class="connector" aria-hidden="true" />

          <div class="row wrap">
            <FamilyNode
              v-for="person in familyTree.grandchildren"
              :key="person.name"
              :name="person.name"
              :role="person.role"
            />
          </div>
        </template>

        <p class="epigraph">{{ familyTree.epigraph }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree {
  display: grid;
  gap: 1.25rem;
  justify-items: center;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
}

.center {
  display: grid;
  justify-items: center;
  gap: 0.85rem;
}

.married {
  font-family: var(--font-script);
  font-size: 1.35rem;
  color: var(--gold);
}

.connector {
  width: 1px;
  height: 1.5rem;
  background: color-mix(in oklch, var(--gold) 55%, transparent);
}

.epigraph {
  margin-top: 1.5rem;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--muted-foreground);
  text-align: center;
  font-size: 1.15rem;
}
</style>
